import { ApiProperty } from '@nestjs/swagger';
import { QueueViewModel } from './queue-view-model';
import { UserModel } from 'src/domain/models/tenanted/user';

export class UserViewModel{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    profile: string;

    @ApiProperty()
    tokenVersion: number;

    @ApiProperty()
    canReadMessage: boolean;

    @ApiProperty()
    sla: string;

    @ApiProperty()
    master: boolean;

    @ApiProperty()
    queues: QueueViewModel[];

    constructor(user: UserModel){

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.profile = user.profile;
        this.tokenVersion = user.tokenVersion;
        this.canReadMessage = user.canReadMessage;
        this.sla = user.sla
        this.master = user.master
        this.queues = user.queues ? user.queues.map((queue) => new QueueViewModel(queue)) : [];
    }
}
