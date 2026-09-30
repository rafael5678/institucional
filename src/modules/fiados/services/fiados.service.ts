import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RecursoNoEncontradoException } from '../../../common/exceptions/business.exception';
import { RegistrarFiadoDto } from '../dto/registrar-fiado.dto';
import { EstadoFiado, FiadoEntity } from '../entities/fiado.entity';
import { FiadoRepository } from '../repositories/fiado.repository';

export type FiadoConWhatsapp = FiadoEntity & { enlaceWhatsapp: string; mensajeCobro: string };

@Injectable()
export class FiadosService {
  constructor(
    private readonly fiados: FiadoRepository,
    private readonly config: ConfigService,
  ) {}

  async registrar(dto: RegistrarFiadoDto): Promise<FiadoConWhatsapp> {
    const nequi = this.config.get<string>('NEQUI_NUMERO', '3005551122');
    const daviplata = this.config.get<string>('DAVIPLATA_NUMERO', '3005553344');
    const entidad = this.fiados.create({
      cliente: dto.cliente,
      telefonoWhatsapp: dto.telefonoWhatsapp,
      montoFiado: dto.montoFiado,
      fechaLimitePago: dto.fechaLimitePago,
      fechaRegistro: dto.fechaRegistro ?? new Date().toISOString().slice(0, 10),
      estado: EstadoFiado.PENDIENTE,
      comercianteId: dto.comercianteId ?? 'unidad-parque-marruecos',
      datosPago: { nequi, daviplata, moneda: 'COP' },
      notas: [],
    });
    const guardado = await this.fiados.save(entidad);
    return this.conEnlace(guardado);
  }

  async listar(soloPendientes = false): Promise<FiadoConWhatsapp[]> {
    const rows = soloPendientes ? await this.fiados.findPendientes() : await this.fiados.findAll();
    return rows.map((f) => this.conEnlace(f));
  }

  async marcarPagado(id: string): Promise<FiadoConWhatsapp> {
    const fiado = await this.fiados.findById(id);
    if (!fiado) {
      throw new RecursoNoEncontradoException('Fiado', id);
    }
    fiado.estado = EstadoFiado.PAGADO;
    const guardado = await this.fiados.save(fiado);
    return this.conEnlace(guardado);
  }

  construirEnlaceWhatsapp(fiado: FiadoEntity): { enlaceWhatsapp: string; mensajeCobro: string } {
    const pais = this.config.get<string>('WHATSAPP_PAIS', '57');
    const negocio = this.config.get<string>('COMERCIANTE_NOMBRE', 'MiPyme Parque Marruecos');
    const nequi = String(fiado.datosPago?.['nequi'] ?? this.config.get('NEQUI_NUMERO'));
    const daviplata = String(fiado.datosPago?.['daviplata'] ?? this.config.get('DAVIPLATA_NUMERO'));
    const saldo = fiado.montoFiado.toLocaleString('es-CO');
    const mensajeCobro =
      `Hola ${fiado.cliente}, te escribimos con cariño desde ${negocio} en el Parque Marruecos. ` +
      `Tienes un saldo pendiente de $${saldo} COP (fiado registrado el ${fiado.fechaRegistro}, ` +
      `fecha límite ${fiado.fechaLimitePago}). ` +
      `Si te queda cómodo, puedes pagarlo por Nequi ${nequi} o Daviplata ${daviplata}. ` +
      `¡Gracias por apoyar el comercio popular del barrio!`;
    const enlaceWhatsapp = `https://wa.me/${pais}${fiado.telefonoWhatsapp}?text=${encodeURIComponent(mensajeCobro)}`;
    return { enlaceWhatsapp, mensajeCobro };
  }

  private conEnlace(fiado: FiadoEntity): FiadoConWhatsapp {
    return { ...fiado, ...this.construirEnlaceWhatsapp(fiado) };
  }
}
