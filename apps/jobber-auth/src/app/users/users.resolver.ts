import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CreateUpdateUserInput } from './dto/create-update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUpdateUserInput
  ) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: CreateUpdateUserInput
  ) {
    return this.usersService.updateUser({
      ...updateUserInput,
      updatedAt: new Date(),
    });
  }

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }
}
