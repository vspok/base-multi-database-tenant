import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';

interface DeleteUserRequest {
    id: number;
};

type DeleteUserResponse = void;

@Injectable()
export class DeleteUser {
  constructor(private readonly logger: ILogger, private userRepository: UserRepository) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
        const {id} =  request;

        await this.userRepository.delete(id);

        this.logger.log('deleteUserCases execute', `User ${id} have been deleted`);
  }
}
