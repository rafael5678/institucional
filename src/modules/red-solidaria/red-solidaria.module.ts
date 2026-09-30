import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSolidariaController } from './controllers/red-solidaria.controller';
import { CompraColectivaEntity } from './entities/compra-colectiva.entity';
import { EncuentroComunitarioEntity } from './entities/encuentro-comunitario.entity';
import { FondoComunitarioEntity } from './entities/fondo-comunitario.entity';
import {
  CompraColectivaRepository,
  EncuentroRepository,
  FondoComunitarioRepository,
} from './repositories/red-solidaria.repository';
import { CirculosSaberesService } from './services/circulos-saberes.service';
import { ComprasColectivasService } from './services/compras-colectivas.service';
import { FondoAhorroMutuoService } from './services/fondo-ahorro-mutuo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompraColectivaEntity,
      FondoComunitarioEntity,
      EncuentroComunitarioEntity,
    ]),
  ],
  controllers: [RedSolidariaController],
  providers: [
    ComprasColectivasService,
    FondoAhorroMutuoService,
    CirculosSaberesService,
    CompraColectivaRepository,
    FondoComunitarioRepository,
    EncuentroRepository,
  ],
  exports: [
    FondoAhorroMutuoService,
    ComprasColectivasService,
    CirculosSaberesService,
    EncuentroRepository,
  ],
})
export class RedSolidariaModule {}
