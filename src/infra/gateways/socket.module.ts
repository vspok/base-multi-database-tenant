import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { ISocketService } from 'src/domain/adapters/socket.interface';

@Module({
    providers: [
        {
            provide: ISocketService,
            useClass: SocketGateway,
        },
    ],
    exports: [ISocketService],
})
export class SocketModule {}
