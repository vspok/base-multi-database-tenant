import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common/decorators';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindManyUser } from 'src/application/use-cases/user/find-many-user';
import { UserViewModel } from '../view-models/user-view-model';
import { AuthGuard } from 'src/infra/guards/auth.guard';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { CreateUserBody } from '../dtos/user/create-user-body';
import { UserModel } from 'src/domain/models/tenanted/user';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserViewModel)
export class UsersController {
    constructor(
        private findManyUser: FindManyUser,
        private createUser: CreateUser,
        private updateUser: UpdateUser,
        private deleteUser: DeleteUser
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    async findCreate(@Body() body: CreateUserBody) {
        const user  = await this.createUser.execute(body);
        return new UserViewModel(user);
    }

    @UseGuards(AuthGuard)
    @Get()
    async find(@Query() filter: any) {
        const { users, count, hasMore } = await this.findManyUser.execute(
            {filter}
        );
        return { users: users.map( e => new UserViewModel(e)), count, hasMore };
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<UserModel>) {
        const user  =  await this.updateUser.execute({
            id: +id,
            user: body,
        });
        return new UserViewModel(user);

    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteUser.execute({
            id: +id,
        });
    }
}
