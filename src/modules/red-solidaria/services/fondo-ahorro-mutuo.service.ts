import { Injectable } from '@nestjs/common';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { PrestamoEmergenciaDto } from '../dto/red-solidaria.dto';
import {
  FondoComunitarioEntity,
  TipoMovimientoFondo,
} from '../entities/fondo-comunitario.entity';
import { FondoComunitarioRepository } from '../repositories/red-solidaria.repository';

@Injectable()
export class FondoAhorroMutuoService {
  constructor(private readonly fondo: FondoComunitarioRepository) {}

  async aportarDesdeReserva(params: {
    comercianteId: string;
    monto: number;
    registroDiarioId: string;
    descripcion: string;
  }): Promise<FondoComunitarioEntity | null> {
    if (params.monto <= 0) {
      return null;
    }
    const saldo = await this.fondo.ultimoSaldo();
    const movimiento = this.fondo.create({
      tipoMovimiento: TipoMovimientoFondo.APORTE,
      monto: params.monto,
      comercianteId: params.comercianteId,
      registroDiarioId: params.registroDiarioId,
      descripcion: params.descripcion,
      saldoResultante: saldo + params.monto,
      metadatos: { origen: 'bolsillo-3-reserva', interes: 0 },
    });
    return this.fondo.save(movimiento);
  }

  async prestar(dto: PrestamoEmergenciaDto): Promise<FondoComunitarioEntity> {
    const saldo = await this.fondo.ultimoSaldo();
    if (dto.monto > saldo) {
      throw new BusinessException(
        `El fondo comunitario no cubre el préstamo. Saldo actual: $${saldo.toLocaleString('es-CO')} COP.`,
      );
    }
    const movimiento = this.fondo.create({
      tipoMovimiento: TipoMovimientoFondo.PRESTAMO,
      monto: dto.monto,
      comercianteId: dto.comercianteId,
      registroDiarioId: null,
      descripcion: dto.motivo ?? 'Préstamo de emergencia interno (sin intereses gota a gota)',
      saldoResultante: saldo - dto.monto,
      metadatos: { interes: 0, modalidad: 'solidaria' },
    });
    return this.fondo.save(movimiento);
  }

  async estado() {
    const movimientos = await this.fondo.findAll();
    const saldo = movimientos[0]?.saldoResultante ?? 0;
    return { saldo, moneda: 'COP', movimientos };
  }
}
