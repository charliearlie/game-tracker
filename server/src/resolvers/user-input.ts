import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
  @Field(() => String)
  username!: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  password!: string;
}
