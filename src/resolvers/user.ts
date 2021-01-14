import * as argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";

@ObjectType()
class FieldError {
  @Field()
  field: String;

  @Field()
  message: String;
}

@InputType()
class UserInput {
  @Field(() => String)
  username!: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  password!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => UserResponse)
  async register(
    @Ctx() { em }: MyContext,
    @Arg("options") options: UserInput
  ): Promise<UserResponse> {
    if (options.username.length < 2) {
      return {
        errors:[{
          field: "username",
          message: "Username not included"
        }]
      }
    }

    if (options.password.length < 2) {
      return {
        errors:[{
          field: "password",
          message: "Password is not valid"
        }]
      }
    }

    const hash = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username.toLowerCase(),
      email: options.email,
      password: hash,
    });
    await em.persistAndFlush(user);

    return {user};
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { em }: MyContext,
    @Arg("options") options: UserInput
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username.toLowerCase(),
    });

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesn't exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, options.password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Password is incorrect",
          },
        ],
      };
    }

    return { user };
  }
}
