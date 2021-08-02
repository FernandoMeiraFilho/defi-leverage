import { Token } from "../entities/Token";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class TokenResolver {
  @Query(() => [Token])
  tokens(@Ctx() { orm }: MyContext): Promise<Token[]> {
    return orm.em.find(Token, {});
  }
}
