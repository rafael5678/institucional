import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EstadoCompraColectiva {
  ABIERTA = 'ABIERTA',
  CONSOLIDADA = 'CONSOLIDADA',
  CERRADA = 'CERRADA',
}

export type PedidoInsumo = {
  comercianteId: string;
  insumo: string;
  cantidad: number;
  unidad: string;
  precioReferenciaRetail?: number;
};

@Entity({ name: 'compras_colectivas' })
export class CompraColectivaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  titulo!: string;

  @Column({ type: 'varchar', length: 20, default: EstadoCompraColectiva.ABIERTA })
  estado!: EstadoCompraColectiva;

  @Column({ type: 'jsonb', default: [] })
  pedidos!: PedidoInsumo[];

  @Column({ type: 'jsonb', default: {} })
  consolidado!: Record<string, unknown>;

  @Column({ name: 'ahorro_estimado', type: 'int', default: 0 })
  ahorroEstimado!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
