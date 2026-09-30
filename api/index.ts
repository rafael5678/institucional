import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { AppModule } from '../src/app.module';
import { TransformResponseInterceptor } from '../src/common/interceptors/transform-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const expressApp = express();
let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.enableCors();
    app.setGlobalPrefix('api', { exclude: ['/'] });
    app.useGlobalInterceptors(new TransformResponseInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    const swagger = new DocumentBuilder()
      .setTitle('MiPyme Marruecos API')
      .setDescription('Red Popular de Gestión y Costeo para unidades productivas informales del Parque Marruecos.')
      .setVersion('1.0.0')
      .build();
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swagger));

    await app.init();
    cachedApp = app;
  }
  return expressApp;
}

export default async (req: Request, res: Response) => {
  const app = await bootstrap();
  app(req, res);
};
