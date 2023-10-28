import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';

interface FindUserRequest {
    id: number;
};

interface FindUserResponse {
    user: UserModel
};

@Injectable()
export class FindUser {
  constructor(private readonly logger: ILogger, private userRepository: UserRepository) {}

  async execute(request: FindUserRequest): Promise<FindUserResponse> {
        const {id} = request;
        const user = await this.userRepository.findOne({id:id});

        if(!user){
            this.logger.verbose('FindUser use-case', "ERR_NO_USER_FOUND");
        }

        return {user};
  }
}
