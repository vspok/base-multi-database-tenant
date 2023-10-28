import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infra/common/filter/exception.filter';
import { LoggerService } from './infra/services/logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './infra/common/interceptors/logger.interceptor';
import { ResponseFormat, ResponseInterceptor } from './infra/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as compression from 'compression';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
//   app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
  .setTitle('k-chat API')
  .setDescription('API that connect wit whatsapp')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });
  app.use(compression());
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    credentials: true,
    origin: true,
    allowedHeaders: ['Authorization', 'ResetToken', 'versao', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['Authorization', 'ResetToken', 'versao'],
});
  await app.listen(process.env.API_PORT);
}
bootstrap();
