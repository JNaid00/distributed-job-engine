import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, map, Observable, of } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from 'types/auth';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
  private readonly logger = new Logger(GqlAuthGuard.name);
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}
  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
      console.log("🚀 ~ GqlAuthGuard ~ onModuleInit ~ authService:", this.authService)
      
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = this.getRequest(context);
    const token = request.cookies?.Authentication;
    console.log("🚀 ~ GqlAuthGuard ~ canActivate ~ token:", token)
    if (!token) {
      this.logger.warn('No authentication token found in cookies');
      return false;
    }

    return this.authService.authenticate({ token }).pipe(
      map((res) => {
        this.logger.log('🚀 ~ GqlAuthGuard ~ canActivate ~ res:', res);
        return true;
      }),
      catchError((err) => {
        this.logger.error('🚀 ~ GqlAuthGuard ~ canActivate ~ err:', err);
        return of(false);
      })
    );
  }

  private getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
