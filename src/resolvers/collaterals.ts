import { MyContext } from "../types";
import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Vault } from "../entities/Vault";

@ObjectType()
class CollateralAggregation {
  @Field({ nullable: true })
  token_name: string;

  @Field({ nullable: true })
  liquidationPrice: number;

  @Field({ nullable: true })
  collateralAmount: number;
}

@Resolver()
export class CollateralResolver {
  @Query(() => [CollateralAggregation])
  async collaterals(@Ctx() { em }: MyContext) {
    const query = em
      .createQueryBuilder(Vault, "v")
      .select([
        "t.token_code_on_protocol as token_name",
        "v.liquidation_price as liquidation_price",
        "sum(v.collateral_amount) as collateral_amount",
      ])
      .leftJoin("v.collateral_token_id", "t")
      .groupBy(["t.token_code_on_protocol", "v.liquidation_price"])
      .execute();
    //   await console.log(query);
    //   return {
    //     token_name: query.token_name,
    //     liquidation_price: query.liquidationPrice,
    //     collateral_amount: query.collateralAmount,
    //   };
    return query;
    // }
  }
}
