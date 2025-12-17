import { AbstractModel } from '@distributed-job-engine/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
