import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .setDescription(
      'Red Popular de Gestión y Costeo para unidades productivas informales del Parque Marruecos.',
    )
    .setVersion('1.0.0')
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swagger));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`MiPyme Marruecos listo en http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}

void bootstrap();
