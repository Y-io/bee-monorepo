import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
// import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@bee/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);
  const port = configService.port;

  app.setGlobalPrefix('api');

  // 版本号
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  // 全局参数过滤
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );

  app.enableCors();

  await app.listen(port, '0.0.0.0');

  Logger.log(`🚀 应用程序正在运行: http://localhost:${port}`);
}

bootstrap();
