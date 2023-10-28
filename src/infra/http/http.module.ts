import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../services/logger/logger.module';
import { AuthsController } from './controllers/auth.controller';
import { UsersController } from './controllers/user.controller';
@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [
    AuthsController,
    UsersController,
  ],
  providers: [
  ],
})
export class HttpModule {}
