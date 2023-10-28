import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';

interface FindAllUserResponse {
    users: UserModel[]
};

@Injectable()
export class FindAllUser {
  constructor(private readonly logger: ILogger, private userRepository: UserRepository) {}

  async execute(): Promise<FindAllUserResponse> {
       const users = await this.userRepository.findAll();
       return {users}
  }
}
