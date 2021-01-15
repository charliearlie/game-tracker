import { Developer } from "../entities/Developer";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class DeveloperResolver {
  @Query(() => [Developer])
  developers(@Ctx() { em }: MyContext): Promise<Developer[]> {
    return em.find(Developer, {});
  }

  @Query(() => Developer, { nullable: true })
  developer(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Developer | null> {
    return em.findOne(Developer, { id });
  }

  @Mutation(() => Developer)
  async createDeveloper(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Developer> {
    const developer = em.create(Developer, { title });
    await em.persistAndFlush(developer);

    return developer;
  }

  @Mutation(() => Developer, { nullable: true })
  async updateDeveloper(
    @Arg("id") id: number,
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Developer | null> {
    const developer = await em.findOne(Developer, { id });
    if (!developer) {
      return null;
    }

    if (title) {
      developer.title = title;
      await em.persistAndFlush(developer);
    }

    return developer;
  }

  @Mutation(() => Boolean)
  async deleteDeveloper(
      @Arg("id") id: number,
      @Ctx() { em }: MyContext
  ): Promise<boolean> {
     await em.nativeDelete(Developer, { id })
      return true;
  }
}
