import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';
import { IRequest } from 'src/helpers/intefaces/request-interface';

@Injectable()
export class SetUserRequestAuth {
    constructor(
        private authRepository: UserRepository,
    ) {}

    async execute(req: Request, userId: number) {
        try {
            const user = await this.authRepository.findById(userId)
            if (user) {
                req['user'] = user; // DEFINE USUARIO DA REQUEST
            }
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
