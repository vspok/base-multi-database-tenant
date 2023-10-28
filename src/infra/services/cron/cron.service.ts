import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AutomaticUpdateChat } from 'src/application/use-cases/chat/automatic-update-chat';
import { LoggerService } from 'src/infra/services/logger/logger.service';

@Injectable()
export class CronService {
    constructor(private readonly logger: LoggerService, private readonly automaticUpdateChat: AutomaticUpdateChat) { }

    @Cron('0 */5 * * * *')
    handleCronUpdateChatStatus() {
        if(process.env.TIME_UPDATE_CHAT_STATUS){
            this.automaticUpdateChat.execute();
            this.logger.debug(new Date().getMinutes().toLocaleString(), 'Rodando script de atualizar status dos chats automaticamente');
        }
    }
}
