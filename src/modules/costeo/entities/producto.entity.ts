import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InsumoEntity } from './insumo.entity';

export type InsumoSnapshot = {
  nombre: string;
  cantidadComprada: number;
  precioPaquete: number;
  cantidadUsada: number;
  costoProrrateado: number;
};

@Entity({ name: 'productos' })
export class ProductoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 180 })
  nombre!: string;

  @Column({ type: 'int' })
  porciones!: number;

  @Column({ name: 'margen_ganancia', type: 'decimal', precision: 6, scale: 4 })
  margenGanancia!: string;

  @Column({ name: 'costo_total_lote', type: 'int' })
  costoTotalLote!: number;

  @Column({ name: 'costo_unitario_porcion', type: 'int' })
  costoUnitarioPorcion!: number;

  @Column({ name: 'precio_sugerido_venta', type: 'int' })
  precioSugeridoVenta!: number;

  /** Lista flexible de ingredientes (esquema local JSONB). */
  @Column({ name: 'insumos_json', type: 'jsonb', default: [] })
  insumosJson!: InsumoSnapshot[];

  @Column({ type: 'jsonb', default: {} })
  metadatos!: Record<string, unknown>;

  @Column({ name: 'comerciante_id', length: 80, default: 'unidad-parque-marruecos' })
  comercianteId!: string;

  @OneToMany(() => InsumoEntity, (insumo) => insumo.producto, { cascade: true })
  insumos!: InsumoEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
