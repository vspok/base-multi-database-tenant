import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LoggerService } from '../services/logger/logger.service';
import { CronService } from '../services/cron/cron.service';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtModule } from '../services/jwt/jwt.module';
import { SocketModule } from '../gateways/socket.module';
import { UserService } from './services/tenanted/user.service';
import { UserRepository } from 'src/domain/repositories/tenanted/user-repository';
import { S3Module } from '../services/awsS3/S3.module';
import { LoggerModule } from '../services/logger/logger.module';
import { tenantFactoryFromRequest } from './providers/tenancy.providers';
import { ITenancyConnection } from 'src/domain/repositories/tenants/tenancy-connection';
import { TenancyConnection } from './services/tenants/tenancy-connection.service';



@Module({
  imports: [
    TypeOrmModule,
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
    LoggerService,
    CronService
  ],
  exports: [
    SocketModule,
    JwtModule,
    BcryptModule,
    CronService,
    LoggerService,
    UserRepository,
    ITenancyConnection,
    "TENANCY_CONNECTION"
  ],
})
export class DatabaseModule {}
