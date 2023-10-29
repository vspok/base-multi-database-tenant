import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

export abstract class ISocketService
    implements OnGatewayConnection, OnGatewayDisconnect
{
    abstract handleMessage(message: string): void;
    abstract handleConnection(cliet: any, ars: any): void;
    abstract handleDisconnect(cliet: any): void;
    abstract updateUnread(status: string, body: {action: string, chatId: number}): void
    abstract chatDelete(status: string, body: {action: string, chatId: number}): void
}
