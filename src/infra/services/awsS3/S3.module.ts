import { Module } from '@nestjs/common';
import { IS3Service } from 'src/domain/adapters/s3.interface';
import { S3Service } from './S3.service';
import { S3Client } from '@aws-sdk/client-s3';
import { LoggerService } from 'src/infra/services/logger/logger.service';

@Module({
  providers: [{
    provide: IS3Service,
    useClass: S3Service,
  },
  LoggerService,
  {
    provide: S3Client,
    useFactory: () => {
      return new S3Client(
        {
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
        });
    },
  },
],
  exports: [
    IS3Service,
    S3Client
]
})
export class S3Module {}
