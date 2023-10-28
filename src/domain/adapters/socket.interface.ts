import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { WhatsappModel } from '../models/whatsapp';
import { MessageModel } from '../models/message';
import { ChatModel } from '../models/chat';
import { ContactModel } from '../models/contact';

export interface WhatsappSessionBody {
    action: 'update' | 'create';
    session: WhatsappModel;
}
export interface AppMessageUpdateBody {
    action: 'update';
    message: MessageModel;
}
export interface AppMessageCreateBody {
    action: 'create';
    message: MessageModel;
    chat: ChatModel,
    contact: ContactModel,
}
export interface ChatNotificationsBody {
    action: 'update' | 'updateUnread' | 'queue changed' | 'user changed';
    chat: ChatModel,
}

export abstract class ISocketService
    implements OnGatewayConnection, OnGatewayDisconnect
{
    abstract handleMessage(message: string): void;
    abstract handleConnection(cliet: any, ars: any): void;
    abstract handleDisconnect(cliet: any): void;
    abstract whatsappSession(body: WhatsappSessionBody): void;
    abstract appMessage(
        chatId: number | string,
        body: AppMessageUpdateBody,
    ): void;
    abstract appMessageCreate(
        chatId: number | string,
        status: string,
        body: AppMessageCreateBody,
    ): void;
    abstract chatNotificationStatus(status: string, id:string, body: ChatNotificationsBody): void
    abstract chatsStatus(status: string, body: ChatNotificationsBody): void
    abstract updateUnread(status: string, body: {action: string, chatId: number}): void
    abstract chatDelete(status: string, body: {action: string, chatId: number}): void
}
