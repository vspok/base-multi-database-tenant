// import { UsuarioService } from './../usuario/usuario.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CheckJWTAuth } from 'src/application/use-cases/auth/check-jwt-auth';
import { SetUserRequestAuth } from 'src/application/use-cases/auth/set-user-request-auth';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private checkJWTAuth: CheckJWTAuth,
        private setUserRequestAuth: SetUserRequestAuth,
    ) {}

    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        if (request.headers.authorization) {
            let decodeToken = await this.checkJWTAuth.execute(
                request.headers.authorization,
            );
            if (decodeToken) {
                await this.setUserRequestAuth.execute(request, decodeToken.id);
            }
            return true;
        }
        return false;
    }
}
@Injectable()
export class ResetApiGuard implements CanActivate {

    constructor(
        private checkJWTAuth: CheckJWTAuth,
        private setUserRequestAuth: SetUserRequestAuth,
    ){}

    async canActivate(context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest();
        if (request.headers.resettoken && typeof request.headers.resettoken == 'string') {
            let decodeToken = await this.checkJWTAuth.execute(
                request.headers.resettoken,
            );
            if (decodeToken) {
                await this.setUserRequestAuth.execute(request, decodeToken.id);
            }
            return true;
        }
        return false;
    }
}
