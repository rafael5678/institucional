import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from '../entities/producto.entity';

@Injectable()
export class ProductoRepository {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly repo: Repository<ProductoEntity>,
  ) {}

  create(data: Partial<ProductoEntity>): ProductoEntity {
    return this.repo.create(data);
  }

  save(entity: ProductoEntity): Promise<ProductoEntity> {
    return this.repo.save(entity);
  }

  findAll(): Promise<ProductoEntity[]> {
    return this.repo.find({
      relations: ['insumos'],
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: string): Promise<ProductoEntity | null> {
    return this.repo.findOne({ where: { id }, relations: ['insumos'] });
  }
}
