import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EstadoFiado {
  PENDIENTE = 'PENDIENTE',
  PAGADO = 'PAGADO',
}

@Entity({ name: 'fiados' })
export class FiadoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'comerciante_id', length: 80 })
  comercianteId!: string;

  @Column({ length: 180 })
  cliente!: string;

  @Column({ name: 'telefono_whatsapp', length: 20 })
  telefonoWhatsapp!: string;

  @Column({ name: 'monto_fiado', type: 'int' })
  montoFiado!: number;

  @Column({ name: 'fecha_registro', type: 'date' })
  fechaRegistro!: string;

  @Column({ name: 'fecha_limite_pago', type: 'date' })
  fechaLimitePago!: string;

  @Column({ type: 'varchar', length: 20, default: EstadoFiado.PENDIENTE })
  estado!: EstadoFiado;

  @Column({ name: 'datos_pago', type: 'jsonb', default: {} })
  datosPago!: Record<string, unknown>;

  @Column({ type: 'jsonb', default: [] })
  notas!: unknown[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
