import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductoEntity } from './producto.entity';

@Entity({ name: 'insumos' })
export class InsumoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'producto_id', type: 'uuid' })
  productoId!: string;

  @ManyToOne(() => ProductoEntity, (producto) => producto.insumos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_id' })
  producto!: ProductoEntity;

  @Column({ length: 180 })
  nombre!: string;

  @Column({ name: 'cantidad_comprada', type: 'decimal', precision: 12, scale: 4 })
  cantidadComprada!: string;

  @Column({ name: 'precio_paquete', type: 'int' })
  precioPaquete!: number;

  @Column({ name: 'cantidad_usada', type: 'decimal', precision: 12, scale: 4 })
  cantidadUsada!: string;

  @Column({ name: 'costo_prorrateado', type: 'int' })
  costoProrrateado!: number;

  @Column({ type: 'jsonb', default: {} })
  metadatos!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
