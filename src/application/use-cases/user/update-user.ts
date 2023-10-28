import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';

interface UpdateUserRequest {
    id: number;
    user: Partial<UserModel>;
};

type UpdateUserResponse = UserModel;

@Injectable()
export class UpdateUser {
  constructor(
    private readonly logger: ILogger,
    private userRepository: UserRepository,
    private readonly bcryptService: IBcryptService)
     {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
        const {id, user} =  request;

        if(user.password){
            user.password = await this.bcryptService.hash(user.password);
        }

        const userUpdate = await this.userRepository.update(id, user);

        this.logger.log('updateUserCases execute', `User ${id} have been updated`);
        return userUpdate;
  }
}
