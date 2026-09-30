import { Injectable } from '@nestjs/common';
import { RecursoNoEncontradoException } from '../../../common/exceptions/business.exception';
import { CrearCompraColectivaDto } from '../dto/red-solidaria.dto';
import {
  CompraColectivaEntity,
  EstadoCompraColectiva,
  PedidoInsumo,
} from '../entities/compra-colectiva.entity';
import { CompraColectivaRepository } from '../repositories/red-solidaria.repository';
import { pesosEnteros } from '../../../common/money/cop';

@Injectable()
export class ComprasColectivasService {
  /** Ahorro estimado al comprar al por mayor (25% sobre precio detal). */
  private readonly factorMayorista = 0.75;

  constructor(private readonly compras: CompraColectivaRepository) {}

  async crear(dto: CrearCompraColectivaDto): Promise<CompraColectivaEntity> {
    const { consolidado, ahorroEstimado } = this.consolidarPedidos(dto.pedidos);
    const entity = this.compras.create({
      titulo: dto.titulo,
      estado: EstadoCompraColectiva.CONSOLIDADA,
      pedidos: dto.pedidos,
      consolidado,
      ahorroEstimado,
    });
    return this.compras.save(entity);
  }

  async listar(): Promise<CompraColectivaEntity[]> {
    return this.compras.findAll();
  }

  async obtener(id: string): Promise<CompraColectivaEntity> {
    const row = await this.compras.findById(id);
    if (!row) {
      throw new RecursoNoEncontradoException('Compra colectiva', id);
    }
    return row;
  }

  consolidarPedidos(pedidos: PedidoInsumo[]): {
    consolidado: Record<string, unknown>;
    ahorroEstimado: number;
  } {
    const porInsumo = new Map<
      string,
      { insumo: string; unidad: string; cantidad: number; comerciantes: string[]; retail: number }
    >();

    for (const p of pedidos) {
      const key = `${p.insumo.toLowerCase()}|${p.unidad}`;
      const actual = porInsumo.get(key) ?? {
        insumo: p.insumo,
        unidad: p.unidad,
        cantidad: 0,
        comerciantes: [],
        retail: 0,
      };
      actual.cantidad += p.cantidad;
      actual.comerciantes.push(p.comercianteId);
      if (p.precioReferenciaRetail) {
        actual.retail += p.precioReferenciaRetail;
      }
      porInsumo.set(key, actual);
    }

    const lineas = [...porInsumo.values()].map((l) => {
      const costoDetal = l.retail;
      const costoMayorista = pesosEnteros(costoDetal * this.factorMayorista);
      const ahorro = Math.max(0, costoDetal - costoMayorista);
      return { ...l, costoDetal, costoMayorista, ahorro };
    });
    const ahorroEstimado = lineas.reduce((acc, l) => acc + l.ahorro, 0);

    return {
      consolidado: {
        lineas,
        comerciantesUnicos: [...new Set(pedidos.map((p) => p.comercianteId))],
        nota: 'Consolidado para compra al por mayor y reducción de costos del parque.',
      },
      ahorroEstimado,
    };
  }
}
