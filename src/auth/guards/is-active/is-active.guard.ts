import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class IsActiveGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest().body;
    const account = await this.authService.isActive(request.username); 
    if(account.status !== 'ACTIVE' || account.status === false) throw new ForbiddenException('Your account is not active.');

    return true;
  }
}
