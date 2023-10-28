import { IArrayResponse } from './../../../helpers/intefaces/array-response-interface';
import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';
import { IFilterOptions } from 'src/helpers/intefaces/filter-options';

interface FindUserRequest {
    filter: IFilterOptions<Partial<UserModel>, {}>;
}

interface FindUserResponse extends IArrayResponse<{ users: UserModel[] }> {}

@Injectable()
export class FindManyUser {
    constructor(
        private readonly logger: ILogger,
        private userRepository: UserRepository,
    ) {}

    async execute(request: FindUserRequest): Promise<FindUserResponse> {
        const { filter } = request;
        const data = await this.userRepository.findMany(filter);

        if (!data) {
            this.logger.verbose('FindManyUser use-case', "ERR_NO_USER_FOUND");
        }

        return data;
    }
}
