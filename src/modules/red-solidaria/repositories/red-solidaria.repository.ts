import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompraColectivaEntity } from '../entities/compra-colectiva.entity';
import { FondoComunitarioEntity } from '../entities/fondo-comunitario.entity';
import { EncuentroComunitarioEntity } from '../entities/encuentro-comunitario.entity';

@Injectable()
export class CompraColectivaRepository {
  constructor(
    @InjectRepository(CompraColectivaEntity)
    private readonly repo: Repository<CompraColectivaEntity>,
  ) {}

  create(data: Partial<CompraColectivaEntity>): CompraColectivaEntity {
    return this.repo.create(data);
  }

  save(e: CompraColectivaEntity): Promise<CompraColectivaEntity> {
    return this.repo.save(e);
  }

  findAll(): Promise<CompraColectivaEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findById(id: string): Promise<CompraColectivaEntity | null> {
    return this.repo.findOne({ where: { id } });
  }
}

@Injectable()
export class FondoComunitarioRepository {
  constructor(
    @InjectRepository(FondoComunitarioEntity)
    private readonly repo: Repository<FondoComunitarioEntity>,
  ) {}

  save(e: FondoComunitarioEntity): Promise<FondoComunitarioEntity> {
    return this.repo.save(e);
  }

  create(data: Partial<FondoComunitarioEntity>): FondoComunitarioEntity {
    return this.repo.create(data);
  }

  findAll(): Promise<FondoComunitarioEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async ultimoSaldo(): Promise<number> {
    const last = await this.repo.find({ order: { createdAt: 'DESC' }, take: 1 });
    return last[0]?.saldoResultante ?? 0;
  }
}

@Injectable()
export class EncuentroRepository {
  constructor(
    @InjectRepository(EncuentroComunitarioEntity)
    private readonly repo: Repository<EncuentroComunitarioEntity>,
  ) {}

  create(data: Partial<EncuentroComunitarioEntity>): EncuentroComunitarioEntity {
    return this.repo.create(data);
  }

  save(e: EncuentroComunitarioEntity): Promise<EncuentroComunitarioEntity> {
    return this.repo.save(e);
  }

  findAll(): Promise<EncuentroComunitarioEntity[]> {
    return this.repo.find({ order: { fechaHora: 'ASC' } });
  }

  findById(id: string): Promise<EncuentroComunitarioEntity | null> {
    return this.repo.findOne({ where: { id } });
  }
}
