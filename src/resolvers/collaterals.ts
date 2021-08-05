import { MyContext } from "../types";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Vault } from "../entities/Vault";

@ObjectType()
class CollateralAggregation {
  @Field({ nullable: true })
  token_erc_code: string;

  @Field({ nullable: true })
  liquidationPrice: number;

  @Field({ nullable: true })
  collateralAmount: number;

  @Field({ nullable: true })
  protocol_name: string;
}

@Resolver()
export class CollateralResolver {
  @Query(() => [CollateralAggregation])
  async collaterals(@Ctx() { em }: MyContext) {
    const query = em
      .createQueryBuilder(Vault, "v")
      .select([
        "t.token_erc_code as token_ERC_code",
        "v.liquidation_price as liquidation_price",
        "p.name as protocol_name",
        "sum(v.collateral_amount) as collateral_amount",
      ])
      .leftJoin("v.collateral_token_id", "t")
      .leftJoin("v.protocol_id", "p")
      .groupBy(["t.token_erc_code", "v.liquidation_price", "p.name"])
      .execute();

    return query;
    // }
  }
  @Query(() => [CollateralAggregation])
  async collateral(
    @Arg("token_erc_code", () => String) token_ECR_code: string,
    @Ctx()
    { em }: MyContext
  ) {
    const query = em
      .createQueryBuilder(Vault, "v")
      .select([
        "t.token_erc_code",
        "v.liquidation_price as liquidation_price",
        "p.name as protocol_name",
        "sum(v.collateral_amount) as collateral_amount",
      ])
      .leftJoin("v.collateral_token_id", "t")
      .leftJoin("v.protocol_id", "p")
      .groupBy(["t.token_erc_code", "v.liquidation_price", "p.name"])
      .where("t.token_erc_code = ?", [token_ECR_code])
      .execute();

    return query;
    // }
  }
}
