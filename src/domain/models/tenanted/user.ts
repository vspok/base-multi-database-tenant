// import { ChatModel } from "./chat";
// import { QueueModel } from "./queue";

export class UserModel{
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
    createdAt: Date;
    updatedAt: Date;
}
