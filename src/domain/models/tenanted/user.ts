// import { ChatModel } from "./chat";
// import { QueueModel } from "./queue";

import { AbstractModel } from "../abstract";

export class UserModel extends AbstractModel{
    id: number;
    name: string;
    email: string;
    password: string;
    profile: string;
    tokenVersion: number;
    canReadMessage: boolean;
    sla: string;
    master: boolean;
    // chats: ChatModel[];
    // queues: QueueModel[];
}
