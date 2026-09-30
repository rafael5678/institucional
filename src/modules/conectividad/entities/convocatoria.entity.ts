import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'convocatorias' })
export class ConvocatoriaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 180 })
  entidad!: string;

  @Column({ length: 240 })
  nombre!: string;

  @Column({ name: 'vigencia_hasta', type: 'date', nullable: true })
  vigenciaHasta!: string | null;

  @Column({ default: true })
  vigente!: boolean;

  @Column({ name: 'enlace_postulacion', type: 'text' })
  enlacePostulacion!: string;

  @Column({ type: 'jsonb', default: [] })
  requisitos!: string[];

  @Column({ type: 'text', nullable: true })
  beneficio!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
