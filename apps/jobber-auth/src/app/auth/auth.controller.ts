import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AuthRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/auth';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  @UseGuards(JwtAuthGuard)
  authenticate(request: AuthRequest): Promise<User> | Observable<User> | User {
    console.log('🚀 ~ AuthController ~ authenticate ~ request:', request);
    console.log('test');
    return {} as any;
  }
}
