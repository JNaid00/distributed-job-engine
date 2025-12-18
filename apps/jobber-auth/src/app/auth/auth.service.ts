import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { TokenPayload } from './dto/token-payload.interface';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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
            expires.getMilliseconds() + parseInt(this.configService.getOrThrow<string>('JWT_EXPIRES_IN_MS')),
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
