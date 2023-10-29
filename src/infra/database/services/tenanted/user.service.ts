import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
    FilterUser,
    UserRepository,
} from 'src/domain/repositories/tenanted/user-repository';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UserMapper } from '../../mappers/user-mapper';
import { IArrayResponse } from 'src/helpers/intefaces/array-response-interface';
import { ISelectQueryBuilder } from 'src/helpers/intefaces/select-query-builder-interface';
import { IDataSource } from 'src/helpers/class/data-source.interface';
import { UserEntity } from '../../entities/tenanted/user.entity';

@Injectable()
export class UserService implements UserRepository {
    private readonly userEntityRepository: Repository<UserEntity>
    constructor(
        @Inject('TENANCY_CONNECTION') connection: IDataSource
        ) {
        this.userEntityRepository = connection.getRepository(UserEntity);

    }


    async create(user: UserModel): Promise<UserModel> {
        const userEntity = UserMapper.toDatabase(user);
        const result = await this.userEntityRepository.save(userEntity);
        return UserMapper.toDomain(result);
    }

    async update(userId: number, user: Partial<UserModel>): Promise<UserModel> {
        const result = await this.userEntityRepository.save({ id: userId, ...user });
        return UserMapper.toDomain(result);
    }

    async delete(userId: number): Promise<void> {
        await this.userEntityRepository.delete({ id: userId });
    }

    async findById(userId: number): Promise<UserModel | null> {
        const userEntity = await this.userEntityRepository.findOne({
            relations: {
                // queues: true
            },
            where: { id: userId },
        });
        if (!userEntity) {
            return null;
        }
        return UserMapper.toDomain(userEntity);
    }

    async findOne(filter: Partial<UserModel>): Promise<UserModel | null> {
        const userEntity = await this.userEntityRepository.findOne({
            relations: {
                // queues: true
            },
            where: filter,
        });
        if (!userEntity) {
            return null;
        }
        return UserMapper.toDomain(userEntity);
    }

    async findMany(
        where: FilterUser = {},
    ): Promise<IArrayResponse<{ users: UserModel[] }>> {
        const {
            limit = 100,
            pageNumber = 1,
            searchParam = null,
            ...filters
        } = where;
        let queryBuilder: ISelectQueryBuilder<UserEntity> =
            this.userEntityRepository.createQueryBuilder('user')
            // .leftJoinAndSelect('user.queues', 'queues');
        let limitPage = 10,
            page = 1;
        if (limit) {
            limitPage = Number(limit);
        }
        if (pageNumber) {
            page = Number(pageNumber);
        }
        const offset = Number(limitPage) * (+page - 1);
        const [UserEntity, count] = await queryBuilder.take(limitPage).skip(offset).getManyAndCount();;
        const users = UserEntity.map(UserMapper.toDomain);
        const hasMore = count > offset + users.length;
        return {
            count,
            users,
            hasMore,
        };
    }

    async findAll(): Promise<UserModel[]> {
        const userEntity = await this.userEntityRepository.find();
        return userEntity.map(UserMapper.toDomain);
    }
}
