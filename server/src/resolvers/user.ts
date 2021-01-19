import * as argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { UserInput } from "./user-input";
import { sendEmail } from "../util/send-email";

@ObjectType()
class FieldError {
  @Field()
  field: String;

  @Field()
  message: String;
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

  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (req.session.userId) {
      const user = await em.findOne(User, { id: req.session.userId });
      return user;
    }
    return null;
  }

  @Mutation(() => UserResponse)
  async register(
    @Ctx() { em, req }: MyContext,
    @Arg("options") options: UserInput
  ): Promise<UserResponse> {
    if (options.username.length < 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Username not included",
          },
        ],
      };
    }

    if (options.password.length < 2) {
      return {
        errors: [
          {
            field: "password",
            message: "Password is not valid",
          },
        ],
      };
    }

    const hash = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username.toLowerCase(),
      email: options.email,
      password: hash,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username or email already exists",
            },
          ],
        };
      }
    }
    console.log(user.id);
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() { em, req }: MyContext,
    @Arg("userNameOrEmail") userNameOrEmail: string,
    @Arg("password") password: string
  ): Promise<UserResponse> {
    let user = null;
    if (userNameOrEmail.includes("@")) {
      user = await em.findOne(User, {
        email: userNameOrEmail.toLowerCase(),
      });
    } else {
      user = await em.findOne(User, {
        username: userNameOrEmail.toLowerCase(),
      });
    }

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username or email doesn't exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, password);
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

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async magicLink(
    @Ctx() { req, em, redis }: MyContext,
    @Arg("email") email: string
  ): Promise<Boolean> {
    const user = await em.findOne(User, { email });

    if (!user) {
      return false;
    }

    const token = uuidv4();

    await redis.set("magic-link:" + token, user.id, "ex", 1000 * 60 * 60);

    const anchor = `<a href="http://localhost:3000/logged-in/${token}">Log in to site</a>`;
    sendEmail(email, anchor);
    return true;
  }

  @Mutation(() => UserResponse)
  async loginWithToken(
    @Ctx() { req, em, redis }: MyContext,
    @Arg("token") token: string
  ) {
    const userId = await redis.get("magic-link:" + token);
    if (!userId) {
      return { errors: [{ field: "token", message: "This token is invalid" }] };
    }

    const user = await em.findOne(User, { id: Number(userId) });

    if (!user) {
      return {
        errors: [
          {
            field: "user",
            message: "User this token belongs to no longer exists",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Ctx() { em, redis }: MyContext,
    @Arg("email") email: string
  ) {
    const user = await em.findOne(User, { email });

    if (!user) {
      return true;
    }

    const token = uuidv4();

    await redis.set("forgot-password:" + token, user.id, "ex", 1000 * 60 * 60);

    const anchor = `<a href="http://localhost:3000/change-password/${token}">Change your password</a>`;
    sendEmail(email, anchor);
    return true;
  }
}
