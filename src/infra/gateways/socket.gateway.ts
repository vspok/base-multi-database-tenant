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
    ISocketService,
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

    chatDelete(status: string, body: {action: string, chatId: number}): void {
        this.server.to(status).emit('chat', body);
    }

    updateUnread(status: string, body: {action: string, chatId: number}): void {
        this.server.to(status).to("notification").emit('chat', body);
    }
}
