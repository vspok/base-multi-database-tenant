import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { FindAllUser } from 'src/application/use-cases/user/find-all-user';
import { FindManyUser } from 'src/application/use-cases/user/find-many-user';
import { FindUser } from 'src/application/use-cases/user/find-user';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { LoggerService } from '../services/logger/logger.service';
import { CronService } from '../services/cron/cron.service';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtModule } from '../services/jwt/jwt.module';
import { SocketModule } from '../gateways/socket.module';
import { UserService } from './services/tenanted/user.service';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';
import { S3Module } from '../services/awsS3/S3.module';
import { LoggerModule } from '../services/logger/logger.module';
import { UserEntity } from './entities/tenanted/user.entity';
import { tenantFactoryFromRequest } from './providers/tenancy.providers';
import { ITenancyConnection } from 'src/domain/repositories/tenants/tenancy-connection';
import { TenancyConnection } from './services/tenants/tenancy-connection.service';

const USE_CASES_USER = [
    FindManyUser,
    FindUser,
    FindAllUser,
    CreateUser,
    UpdateUser,
    DeleteUser
]
@Module({
  imports: [
    TypeOrmModule.forFeature([
        UserEntity,
    ]),
    LoggerModule,
    S3Module,
    SocketModule,
    JwtModule,
    BcryptModule,

],
  providers: [
    tenantFactoryFromRequest,
    {
      provide: UserRepository,
      useClass: UserService
    },
    {
      provide: ITenancyConnection,
      useClass: TenancyConnection
    },
    ...USE_CASES_USER,
    LoggerService,
    CronService
  ],
  exports: [
    SocketModule,
    JwtModule,
    BcryptModule,
    CronService,
    LoggerService,
    "TENANCY_CONNECTION"
  ],
})
export class DatabaseModule {}
