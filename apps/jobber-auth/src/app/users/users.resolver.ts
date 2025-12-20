import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }
}
