import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../services/logger/logger.module';
import { AuthsController } from './controllers/auth.controller';
import { UsersController } from './controllers/user.controller';
import { CheckJWTAuth } from 'src/application/use-cases/auth/check-jwt-auth';
import { CheckUserAuth } from 'src/application/use-cases/auth/check-user-auth';
import { CreateJWTAuth } from 'src/application/use-cases/auth/create-jwt-auth';
import { SetUserRequestAuth } from 'src/application/use-cases/auth/set-user-request-auth';
import { ResetJWTAuth } from 'src/application/use-cases/auth/reset-jwt-auth';
import { LoginAuth } from 'src/application/use-cases/auth/login-auth';
import { FindManyUser } from 'src/application/use-cases/user/find-many-user';
import { FindUser } from 'src/application/use-cases/user/find-user';
import { FindAllUser } from 'src/application/use-cases/user/find-all-user';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';

const USE_CASES_AUTH = [
    CheckJWTAuth,
    CheckUserAuth,
    CreateJWTAuth,
    SetUserRequestAuth,
    ResetJWTAuth,
    LoginAuth,
];
const USE_CASES_USER = [
    FindManyUser,
    FindUser,
    FindAllUser,
    CreateUser,
    UpdateUser,
    DeleteUser
]

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [
    AuthsController,
    UsersController,
  ],
  providers: [
    ...USE_CASES_AUTH,
    ...USE_CASES_USER,
  ],
})
export class HttpModule {}
