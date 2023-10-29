import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from 'src/infra/services/logger/logger.service';

@Injectable()
export class CronService {
    constructor(private readonly logger: LoggerService) { }

    @Cron('0 */5 * * * *')
    handleCronUpdateChatStatus() {
        if(process.env.TIME_UPDATE_CHAT_STATUS){
            this.logger.debug(new Date().getMinutes().toLocaleString(), 'Rodando script de atualizar status dos chats automaticamente');
        }
    }
}
