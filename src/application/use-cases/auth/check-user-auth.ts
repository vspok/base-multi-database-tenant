import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';
import { LoggerService } from 'src/infra/services/logger/logger.service';

interface LoginAuthRequest {
    email: string;
    password: string;
}

// interface LoginAuthResponse {
//     name: string;
// };

@Injectable()
export class CheckUserAuth {
    constructor(
        private readonly logger: ILogger,
        private userRepository: UserRepository,
        private readonly bcryptService: IBcryptService,
    ) {}

    async execute(request: LoginAuthRequest): Promise<UserModel> {
        const { email, password } = request;
        const user = await this.userRepository.findOne({ email });

        if (!user) {
            this.logger.error('CheckUserAuth execute', 'User not found');
            return;
        }
        if (!(await this.bcryptService.compare(password, user.password))) {
            this.logger.error('CheckUserAuth execute', 'Invalid Credentials');
            return;
        }

        return user;
    }
}
