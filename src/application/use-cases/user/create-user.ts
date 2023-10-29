import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';

interface CreateUserRequest {

    name: string;
    email: string;
    password: string;
    profile: string;
    tokenVersion: number;
    canReadMessage: boolean;
    sla: string
};

// interface CreateUserResponse {
//     name: string;
// };

@Injectable()
export class CreateUser {
  constructor(
    private readonly logger: ILogger,
    private userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    ) {}

  async execute(request: CreateUserRequest): Promise<UserModel> {
        console.log(request);
        const user = new UserModel();
        user.name = request.name;
        user.email = request.email;
        user.password = await this.bcryptService.hash(request.password);
        user.profile = request.profile;
        user.tokenVersion = request.tokenVersion;
        user.canReadMessage = request.canReadMessage;
        user.sla = request.sla;

        const result = await this.userRepository.create(user);

        this.logger.log('createUserCases execute', 'New user have been created');

        return result;
  }
}
