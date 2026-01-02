import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AuthRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/auth';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  authenticate(request: AuthRequest): Promise<User> | Observable<User> | User {
    throw new Error('Method not implemented.');
  }
}
