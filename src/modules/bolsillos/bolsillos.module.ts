import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedSolidariaModule } from '../red-solidaria/red-solidaria.module';
import { BolsillosController } from './controllers/bolsillos.controller';
import { RegistroDiarioEntity } from './entities/registro-diario.entity';
import { RegistroDiarioRepository } from './repositories/registro-diario.repository';
import { BolsillosService } from './services/bolsillos.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroDiarioEntity]), RedSolidariaModule],
  controllers: [BolsillosController],
  providers: [BolsillosService, RegistroDiarioRepository],
  exports: [BolsillosService],
})
export class BolsillosModule {}
