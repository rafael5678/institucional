import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EstadoEncuentro {
  PROGRAMADO = 'PROGRAMADO',
  REALIZADO = 'REALIZADO',
  CANCELADO = 'CANCELADO',
}

export type Asistente = {
  nombre: string;
  comercianteId?: string;
  presente: boolean;
};

@Entity({ name: 'encuentros_comunitarios' })
export class EncuentroComunitarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  titulo!: string;

  @Column({ length: 200, default: 'Parque Marruecos' })
  lugar!: string;

  @Column({ name: 'fecha_hora', type: 'timestamptz' })
  fechaHora!: Date;

  @Column({ type: 'int', default: 30 })
  cupo!: number;

  @Column({ type: 'varchar', length: 20, default: EstadoEncuentro.PROGRAMADO })
  estado!: EstadoEncuentro;

  @Column({ type: 'jsonb', default: [] })
  asistencia!: Asistente[];

  @Column({ type: 'jsonb', default: [] })
  saberes!: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
