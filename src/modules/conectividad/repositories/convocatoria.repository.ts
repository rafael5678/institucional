import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConvocatoriaEntity } from '../entities/convocatoria.entity';

@Injectable()
export class ConvocatoriaRepository {
  constructor(
    @InjectRepository(ConvocatoriaEntity)
    private readonly repo: Repository<ConvocatoriaEntity>,
  ) {}

  findVigentes(): Promise<ConvocatoriaEntity[]> {
    return this.repo.find({ where: { vigente: true }, order: { entidad: 'ASC' } });
  }

  save(e: ConvocatoriaEntity): Promise<ConvocatoriaEntity> {
    return this.repo.save(e);
  }

  create(data: Partial<ConvocatoriaEntity>): ConvocatoriaEntity {
    return this.repo.create(data);
  }

  count(): Promise<number> {
    return this.repo.count();
  }
}
