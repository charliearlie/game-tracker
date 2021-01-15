import { Trophy } from "../entities/Trophy";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TrophyResolver {
  @Query(() => [Trophy])
  Trophies(@Ctx() { em }: MyContext): Promise<Trophy[]> {
    return em.find(Trophy, {});
  }

  @Query(() => Trophy, { nullable: true })
  Trophy(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Trophy | null> {
    return em.findOne(Trophy, { id });
  }

  @Mutation(() => Trophy)
  async createTrophy(
    @Arg("title", () => String) title: string,
    @Arg("desription", () => String) description: string,
    @Arg("level", () => String) level: string,
    @Ctx() { em }: MyContext
  ): Promise<Trophy> {
    const trophy = em.create(Trophy, { description, level, title });
    await em.persistAndFlush(trophy);

    return trophy;
  }

  @Mutation(() => Trophy, { nullable: true })
  async updateTrophy(
    @Arg("id") id: number,
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Trophy | null> {
    const trophy = await em.findOne(Trophy, { id });
    if (!trophy) {
      return null;
    }

    if (title) {
      trophy.title = title;
      await em.persistAndFlush(trophy);
    }

    return trophy;
  }

  @Mutation(() => Boolean)
  async deleteTrophy(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Trophy, { id });
    return true;
  }
}
