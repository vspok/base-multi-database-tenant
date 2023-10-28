import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
    AppMessageCreateBody,
    AppMessageUpdateBody,
    ChatNotificationsBody,
    ISocketService,
    WhatsappSessionBody,
} from 'src/domain/adapters/socket.interface';
import { ILogger } from 'src/domain/logger/logger.interface';

@WebSocketGateway({ cors: { origin: '*' }, transports: ['websocket'] })
export class SocketGateway implements ISocketService {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('joinChatBox')
    joinChatBox(socket: Socket, chatId: string) {
        // console.log('joinChatBox', chatId);

        socket.join(chatId);
    }
    @SubscribeMessage('joinChats')
    joinChats(socket: Socket, status: string) {
        // console.log('joinChatBox', status);

        socket.join(status);
    }
    @SubscribeMessage('joinNotification')
    joinNotification(socket: Socket, roomId: string) {
        // console.log('notification');

        socket.join("notification");
    }
    // @SubscribeMessage('events')
    // handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    // const event = 'events';
    // // return { event, data };
    // }
    handleMessage(message: string): void {
        console.log('SOCKET handleMessage', message);
    }
    handleConnection(cliet: any, ars: any): void {
        console.log('SOCKET CONNECT', cliet.request.headers.origin, ars);
    }
    handleDisconnect(cliet: any): void {
        console.log('SOCKET DISCONNECT', cliet.request.headers.origin);
    }
    whatsappSession(body: WhatsappSessionBody): void {
        this.server.emit('whatsappSession', body);
    }
    appMessage(chatId: number | string, body: AppMessageUpdateBody): void {
        this.server.to(String(chatId)).emit('appMessage', body);
    }

    appMessageCreate(chatId: number | string, status: string, body: AppMessageCreateBody): void {
        // console.log('chatId', chatId)
        // console.log('status', status)
        this.server
        .to(String(chatId))
        .to(String(status))
        .to("notification")
        .emit('appMessage', body);
    }

    chatNotificationStatus(status: string, id: string, body: ChatNotificationsBody): void {
        this.server.to(status).to("notification").to(id).emit('chat', body);
    }

    chatsStatus(status: string, body: ChatNotificationsBody): void {
        this.server.to(status).emit('chats', body);
    }

    chatDelete(status: string, body: {action: string, chatId: number}): void {
        this.server.to(status).emit('chat', body);
    }

    updateUnread(status: string, body: {action: string, chatId: number}): void {
        this.server.to(status).to("notification").emit('chat', body);
    }
}
