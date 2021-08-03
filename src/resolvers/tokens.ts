import { Token } from "../entities/Token";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class TokenResolver {
  @Query(() => [Token])
  tokens(@Ctx() { em }: MyContext): Promise<Token[]> {
    return em.find(Token, {});
  }
}
