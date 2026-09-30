import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoFiado, FiadoEntity } from '../entities/fiado.entity';

@Injectable()
export class FiadoRepository {
  constructor(
    @InjectRepository(FiadoEntity)
    private readonly repo: Repository<FiadoEntity>,
  ) {}

  create(data: Partial<FiadoEntity>): FiadoEntity {
    return this.repo.create(data);
  }

  save(entity: FiadoEntity): Promise<FiadoEntity> {
    return this.repo.save(entity);
  }

  findAll(): Promise<FiadoEntity[]> {
    return this.repo.find({ order: { fechaLimitePago: 'ASC' } });
  }

  findPendientes(): Promise<FiadoEntity[]> {
    return this.repo.find({
      where: { estado: EstadoFiado.PENDIENTE },
      order: { fechaLimitePago: 'ASC' },
    });
  }

  findById(id: string): Promise<FiadoEntity | null> {
    return this.repo.findOne({ where: { id } });
  }
}
