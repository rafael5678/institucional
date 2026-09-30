import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'registros_diarios' })
export class RegistroDiarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'comerciante_id', length: 80 })
  comercianteId!: string;

  @Column({ name: 'fecha_cierre', type: 'date' })
  fechaCierre!: string;

  @Column({ name: 'venta_total_dia', type: 'int' })
  ventaTotalDia!: number;

  @Column({ name: 'bolsillo_reinversion', type: 'int' })
  bolsilloReinversion!: number;

  @Column({ name: 'bolsillo_sustento', type: 'int' })
  bolsilloSustento!: number;

  @Column({ name: 'bolsillo_reserva', type: 'int' })
  bolsilloReserva!: number;

  @Column({ name: 'aporte_fondo_comunitario', type: 'int', default: 0 })
  aporteFondoComunitario!: number;

  @Column({ type: 'jsonb', default: {} })
  detalle!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
