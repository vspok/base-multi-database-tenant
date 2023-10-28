import { IMessage } from "src/helpers/intefaces/client-message-interface";
import { IMessageMedia } from "src/helpers/intefaces/message-media-interface";

export abstract class IS3Service {
    abstract uploadFile(msg: IMessage, media: IMessageMedia): Promise<string>;
}
