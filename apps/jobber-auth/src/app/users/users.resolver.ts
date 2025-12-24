import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { TokenPayload } from '../auth/dto/token-payload.interface';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

import { CurrentUser } from './current-user.decorator';
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

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async getUser(@CurrentUser() { userId }: TokenPayload) {
    console.log('🚀 ~ UsersResolver ~ getUser ~ userId:', userId);
    return this.usersService.findOne({
      id: userId,
    });
  }
}
