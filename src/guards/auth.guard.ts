import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    // revisamos que este el token en header
    if (!request.headers['authorization']) {
      throw new HttpException(
        'Debes estar autenticado para consultar',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const token = request.headers['authorization'].split(' ')[1];
      const res = await this.authService.validate(token);
      request.user = res;
      return true;
    } catch (error) {
      throw new HttpException(
        'session expirada por favor inicia sesion de nuevo',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
