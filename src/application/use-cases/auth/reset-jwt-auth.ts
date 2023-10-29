import { Injectable } from '@nestjs/common';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { UserModel } from 'src/domain/models/tenanted/user';

@Injectable()
export class ResetJWTAuth {
    constructor(private readonly jwtService: IJwtService) {}

    async execute(user:UserModel): Promise<string> {
        const {
            email,
            id,
            canReadMessage,
            master,
            profile,
            sla,
            name,
        } = user;

        const token = this.jwtService.createToken(
            {name, email, id, canReadMessage, master, profile, sla },
            process.env.JWT_SECRET,
            '30d',
        );

        return token;
    }
}
