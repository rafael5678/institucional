import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TipoMovimientoFondo {
  APORTE = 'APORTE',
  PRESTAMO = 'PRESTAMO',
  PAGO_PRESTAMO = 'PAGO_PRESTAMO',
}

@Entity({ name: 'fondo_comunitario' })
export class FondoComunitarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'tipo_movimiento', length: 40 })
  tipoMovimiento!: TipoMovimientoFondo;

  @Column({ type: 'int' })
  monto!: number;

  @Column({ name: 'comerciante_id', type: 'varchar', length: 80, nullable: true })
  comercianteId!: string | null;

  @Column({ name: 'registro_diario_id', type: 'uuid', nullable: true })
  registroDiarioId!: string | null;

  @Column({ type: 'text', nullable: true })
  descripcion!: string | null;

  @Column({ name: 'saldo_resultante', type: 'int' })
  saldoResultante!: number;

  @Column({ type: 'jsonb', default: {} })
  metadatos!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
