import { Injectable } from '@nestjs/common';
import { pesosEnteros } from '../../../common/money/cop';
import { FondoAhorroMutuoService } from '../../red-solidaria/services/fondo-ahorro-mutuo.service';
import { CierreCajaDto } from '../dto/cierre-caja.dto';
import { RegistroDiarioEntity } from '../entities/registro-diario.entity';
import { RegistroDiarioRepository } from '../repositories/registro-diario.repository';

/** Regla solidaria de distribución de la venta diaria. */
export const REGLA_BOLSILLOS = {
  reinversion: 0.6,
  sustento: 0.3,
  reserva: 0.1,
  /** Porción del bolsillo 3 que alimenta la caja común comunitaria. */
  aporteFondoSobreReserva: 0.1,
} as const;

@Injectable()
export class BolsillosService {
  constructor(
    private readonly historial: RegistroDiarioRepository,
    private readonly fondo: FondoAhorroMutuoService,
  ) {}

  async cerrarCaja(dto: CierreCajaDto): Promise<RegistroDiarioEntity> {
    const venta = pesosEnteros(dto.ventaTotalDia);
    const bolsilloReinversion = pesosEnteros(venta * REGLA_BOLSILLOS.reinversion);
    const bolsilloSustento = pesosEnteros(venta * REGLA_BOLSILLOS.sustento);
    const bolsilloReserva = venta - bolsilloReinversion - bolsilloSustento;
    const aporteFondoComunitario = pesosEnteros(
      bolsilloReserva * REGLA_BOLSILLOS.aporteFondoSobreReserva,
    );

    const comercianteId = dto.comercianteId ?? 'unidad-parque-marruecos';
    const fechaCierre = dto.fechaCierre ?? new Date().toISOString().slice(0, 10);

    const registro = this.historial.create({
      comercianteId,
      fechaCierre,
      ventaTotalDia: venta,
      bolsilloReinversion,
      bolsilloSustento,
      bolsilloReserva,
      aporteFondoComunitario,
      detalle: {
        regla: REGLA_BOLSILLOS,
        moneda: 'COP',
        leyenda: {
          bolsillo1: 'Reinversión insumos (60%)',
          bolsillo2: 'Ganancia / sustento del hogar (30%)',
          bolsillo3: 'Fondo de reserva y ahorro (10%)',
          fondoComunitario: '10% del bolsillo 3 a la caja común (préstamos sin gota a gota)',
        },
      },
    });

    const guardado = await this.historial.save(registro);
    await this.fondo.aportarDesdeReserva({
      comercianteId,
      monto: aporteFondoComunitario,
      registroDiarioId: guardado.id,
      descripcion: `Aporte del 10% del bolsillo 3 — cierre ${fechaCierre}`,
    });
    return guardado;
  }

  listarHistorial(): Promise<RegistroDiarioEntity[]> {
    return this.historial.findAll();
  }
}
