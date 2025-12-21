import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';

import { UsersService } from '../users/users.service';

import { LoginInput } from './dto/login.input';
import { TokenPayload } from './dto/token-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }

    async login({ email, password }: LoginInput, response: Response) {
        const user = await this.validateUser(email, password);

        // Json Web Token (JWT)
        const expires = new Date();
        expires.setMilliseconds(
            expires.getMilliseconds() + parseInt(this.configService.getOrThrow<string>('AUTH_JWT_EXPIRES_IN')),
        );

        const tokenpayload: TokenPayload = {
            userId: user.id,
            email: user.email,
        };
        const accessToken = this.jwtService.sign(tokenpayload);

        // Set cookie
        response.cookie('Authentication', accessToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            expires,
        });
        return user;
    }

    private async validateUser(email: string, password: string) {
        try {
            const user = await this.usersService.findByEmail({
                email: email
            });
            const auth = await compare(password, user.password);
            if (!auth) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException(`Invalid credentials: ${error.message}`);
        }
    }
}
