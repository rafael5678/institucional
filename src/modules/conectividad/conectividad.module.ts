import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConectividadController } from './controllers/conectividad.controller';
import { ConvocatoriaEntity } from './entities/convocatoria.entity';
import { ConvocatoriaRepository } from './repositories/convocatoria.repository';
import { ConectividadService } from './services/conectividad.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConvocatoriaEntity])],
  controllers: [ConectividadController],
  providers: [ConectividadService, ConvocatoriaRepository],
  exports: [ConectividadService],
})
export class ConectividadModule {}
