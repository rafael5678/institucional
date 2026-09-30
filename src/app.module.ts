import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SaludController } from './salud.controller';
import { CosteoModule } from './modules/costeo/costeo.module';
import { BolsillosModule } from './modules/bolsillos/bolsillos.module';
import { FiadosModule } from './modules/fiados/fiados.module';
import { RedSolidariaModule } from './modules/red-solidaria/red-solidaria.module';
import { ConectividadModule } from './modules/conectividad/conectividad.module';
import { SeedModule } from './database/seeds/seed.module';
import { ProductoEntity } from './modules/costeo/entities/producto.entity';
import { InsumoEntity } from './modules/costeo/entities/insumo.entity';
import { RegistroDiarioEntity } from './modules/bolsillos/entities/registro-diario.entity';
import { FiadoEntity } from './modules/fiados/entities/fiado.entity';
import { CompraColectivaEntity } from './modules/red-solidaria/entities/compra-colectiva.entity';
import { FondoComunitarioEntity } from './modules/red-solidaria/entities/fondo-comunitario.entity';
import { EncuentroComunitarioEntity } from './modules/red-solidaria/entities/encuentro-comunitario.entity';
import { ConvocatoriaEntity } from './modules/conectividad/entities/convocatoria.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl =
          config.get<string>('DATABASE_URL') || config.get<string>('POSTGRES_URL');
        const ssl = config.get<string>('DB_SSL', 'false') === 'true';

        return {
          type: 'postgres' as const,
          ...(databaseUrl
            ? { url: databaseUrl }
            : {
                host: config.get<string>('DB_HOST', 'localhost'),
                port: Number(config.get('DB_PORT', 5432)),
                username: config.get<string>('DB_USER', 'marruecos'),
                password: config.get<string>('DB_PASSWORD', 'marruecos123'),
                database: config.get<string>('DB_NAME', 'mipyme_marruecos'),
              }),
          ...(ssl ? { ssl: { rejectUnauthorized: true } } : {}),
          entities: [
            ProductoEntity,
            InsumoEntity,
            RegistroDiarioEntity,
            FiadoEntity,
            CompraColectivaEntity,
            FondoComunitarioEntity,
            EncuentroComunitarioEntity,
            ConvocatoriaEntity,
          ],
          synchronize: true,
          logging: config.get('NODE_ENV') === 'development',
        };
      },
    }),
    CosteoModule,
    BolsillosModule,
    FiadosModule,
    RedSolidariaModule,
    ConectividadModule,
    SeedModule,
  ],
  controllers: [SaludController],
})
export class AppModule {}
