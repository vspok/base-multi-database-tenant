// import { Injectable } from "@nestjs/common";
// import { IS3Service } from "src/domain/adapters/s3.interface";
// import { IMessage } from "src/helpers/intefaces/client-message-interface";
// import { IMessageMedia } from "src/helpers/intefaces/message-media-interface";
// import { LoggerService } from "src/infra/services/logger/logger.service";
// var mime = require('mime-types');
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// @Injectable()
// export class S3Service implements IS3Service {
//     private readonly bucketName = 'kchat';
//     constructor(private readonly logger: LoggerService, private readonly s3Client: S3Client) {}

//     async uploadFile(msg: IMessage, media: IMessageMedia): Promise<string> {
//         let buffer = Buffer.from(media.data, 'base64');

//         let array = media.filename?.split('.');
//         let extension = mime.extension(media.mimetype) ? mime.extension(media.mimetype) : array ? array[array?.length - 1] : ''
//         let name = msg.id.id + "-" + media.filename?.replace('.'+extension, '')?.replace(/[^a-z0-9]/gi, '') + '.'+extension;

//         try {
//             const uploadParams = {
//                 Bucket: this.bucketName,
//                 Key: name,
//                 Body: buffer,
//                 ContentType: media.mimetype,
//                 ContentEncoding: "base64",
//                 ACL: 'public-read',
//             }
//             const command = new PutObjectCommand(uploadParams);
//             await this.s3Client.send(command);
//             return `https://${this.bucketName}.s3.amazonaws.com/${name}`;
//         } catch (error) {
//           this.logger.error('uploadFile', "Erro ao fazer upload " + error);
//           if (!["to be unique"].includes(error as string)) {
//             throw new Error("ERR_NO_UPLLOAD_FILE");
//           } else {
//             throw new Error("ERR_NO_UPLLOAD_FILE_2");
//           }
//         }
//     }

// }
