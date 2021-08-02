import { Protocol } from "../entities/Protocol";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class ProtocolResolver {
  @Query(() => [Protocol])
  protocols(@Ctx() { orm }: MyContext): Promise<Protocol[]> {
    return orm.em.find(Protocol, {});
  }
}
