import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiadosController } from './controllers/fiados.controller';
import { FiadoEntity } from './entities/fiado.entity';
import { FiadoRepository } from './repositories/fiado.repository';
import { FiadosService } from './services/fiados.service';

@Module({
  imports: [TypeOrmModule.forFeature([FiadoEntity])],
  controllers: [FiadosController],
  providers: [FiadosService, FiadoRepository],
  exports: [FiadosService],
})
export class FiadosModule {}
