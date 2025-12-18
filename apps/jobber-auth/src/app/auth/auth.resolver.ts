import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
    @Mutation(() => User)
    async login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
        return {
            id: '1',
            email: loginInput.email,
            password: loginInput.password,
        };
    }
}