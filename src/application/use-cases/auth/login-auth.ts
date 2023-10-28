import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggerService } from 'src/infra/services/logger/logger.service';
import { CheckUserAuth } from './check-user-auth';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';
import { CreateJWTAuth } from './create-jwt-auth';
import { UserModel } from 'src/domain/models/tenanted/user';
import { ILogger } from 'src/domain/logger/logger.interface';
import { ResetJWTAuth } from './reset-jwt-auth';

interface LoginAuthRequest {
    email: string;
    password: string;
}

interface LoginAuthResponse {
    token: string;
    refreshToken: string;
    user: UserModel;
}

@Injectable()
export class LoginAuth {
    constructor(
        private readonly logger: ILogger,
        // private authRepository: UserRepository,
        private readonly checkUserAuth: CheckUserAuth,
        private readonly createJWTAuth: CreateJWTAuth,
        private readonly resetJWTAuth: ResetJWTAuth,
    ) {}

    async execute(request: LoginAuthRequest): Promise<LoginAuthResponse> {
        const user = await this.checkUserAuth.execute(request);

        if (!user) {
            throw new UnauthorizedException(
                'LoginAuth execute',
                'Invalid Credentials',
            );
        }
        const token = await this.createJWTAuth.execute(user);
        const refreshToken = await this.resetJWTAuth.execute(user);

        this.logger.log('LoginAuth execute', 'New auth have been logind');

        return { token, refreshToken , user };
    }
}
