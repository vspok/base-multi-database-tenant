import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { config } from 'ormconfig';
import * as dotenv from 'dotenv';
import { ScheduleModule } from '@nestjs/schedule';
import { VersaoMiddleware } from './infra/common/middlewares/versao.middleware';
import { TenantModule } from './tenant/tenant.module';
dotenv.config({
  path: process.env.NODE_ENV == 'production' ? '.env.production' : '.env',
});

@Module({
  imports: [
    HttpModule,
    // DatabaseModule,
    // TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    ScheduleModule.forRoot(),
    TenantModule
  ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VersaoMiddleware).forRoutes('*');
    }
}
