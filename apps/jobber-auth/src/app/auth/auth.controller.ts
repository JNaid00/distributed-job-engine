import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AuthRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/auth';

import { UsersService } from '../users/users.service';

import { TokenPayload } from './dto/token-payload.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthRequest & { user: TokenPayload }
  ): Promise<User> | Observable<User> | User {
    return this.userService.findOne({
      id: request.user.userId,
    });
  }
}
