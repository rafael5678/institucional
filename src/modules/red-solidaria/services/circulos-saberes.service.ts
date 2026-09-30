import { Injectable } from '@nestjs/common';
import { RecursoNoEncontradoException } from '../../../common/exceptions/business.exception';
import { AsistenciaDto, CrearEncuentroDto } from '../dto/red-solidaria.dto';
import {
  EncuentroComunitarioEntity,
  EstadoEncuentro,
} from '../entities/encuentro-comunitario.entity';
import { EncuentroRepository } from '../repositories/red-solidaria.repository';

@Injectable()
export class CirculosSaberesService {
  constructor(private readonly encuentros: EncuentroRepository) {}

  async programar(dto: CrearEncuentroDto): Promise<EncuentroComunitarioEntity> {
    const row = this.encuentros.create({
      titulo: dto.titulo,
      lugar: dto.lugar ?? 'Parque Marruecos',
      fechaHora: new Date(dto.fechaHora),
      cupo: dto.cupo ?? 30,
      estado: EstadoEncuentro.PROGRAMADO,
      asistencia: [],
      saberes: dto.saberes ?? [],
    });
    return this.encuentros.save(row);
  }

  listar(): Promise<EncuentroComunitarioEntity[]> {
    return this.encuentros.findAll();
  }

  async registrarAsistencia(
    id: string,
    dto: AsistenciaDto,
  ): Promise<EncuentroComunitarioEntity> {
    const encuentro = await this.encuentros.findById(id);
    if (!encuentro) {
      throw new RecursoNoEncontradoException('Encuentro comunitario', id);
    }
    const resto = encuentro.asistencia.filter((a) => a.nombre !== dto.nombre);
    encuentro.asistencia = [...resto, dto];
    return this.encuentros.save(encuentro);
  }
}
