import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroDiarioEntity } from '../entities/registro-diario.entity';

@Injectable()
export class RegistroDiarioRepository {
  constructor(
    @InjectRepository(RegistroDiarioEntity)
    private readonly repo: Repository<RegistroDiarioEntity>,
  ) {}

  create(data: Partial<RegistroDiarioEntity>): RegistroDiarioEntity {
    return this.repo.create(data);
  }

  save(entity: RegistroDiarioEntity): Promise<RegistroDiarioEntity> {
    return this.repo.save(entity);
  }

  findAll(): Promise<RegistroDiarioEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
