import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CosteoController } from './controllers/costeo.controller';
import { ProductoEntity } from './entities/producto.entity';
import { InsumoEntity } from './entities/insumo.entity';
import { ProductoRepository } from './repositories/producto.repository';
import { CosteoService } from './services/costeo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity, InsumoEntity])],
  controllers: [CosteoController],
  providers: [CosteoService, ProductoRepository],
  exports: [CosteoService, ProductoRepository],
})
export class CosteoModule {}
