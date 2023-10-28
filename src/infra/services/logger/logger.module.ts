import { ILogger } from 'src/domain/logger/logger.interface';
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
    providers: [{
        provide: ILogger,
        useClass: LoggerService,
    }],
    exports: [ILogger],
})
export class LoggerModule {}
