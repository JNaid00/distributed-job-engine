import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { UsersModule } from '../users/users.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [UsersModule, ConfigModule, JwtModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
