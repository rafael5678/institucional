import { Module } from '@nestjs/common';
import { BolsillosModule } from '../../modules/bolsillos/bolsillos.module';
import { CosteoModule } from '../../modules/costeo/costeo.module';
import { FiadosModule } from '../../modules/fiados/fiados.module';
import { RedSolidariaModule } from '../../modules/red-solidaria/red-solidaria.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CosteoModule, BolsillosModule, FiadosModule, RedSolidariaModule],
  providers: [SeedService],
})
export class SeedModule {}
