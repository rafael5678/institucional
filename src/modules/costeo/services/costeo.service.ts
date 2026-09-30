import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { pesosEnteros, redondearPrecioPopular } from '../../../common/money/cop';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { RegistrarLoteDto } from '../dto/registrar-lote.dto';
import { InsumoEntity } from '../entities/insumo.entity';
import { InsumoSnapshot, ProductoEntity } from '../entities/producto.entity';
import { ProductoRepository } from '../repositories/producto.repository';

@Injectable()
export class CosteoService {
  constructor(
    private readonly productos: ProductoRepository,
    private readonly config: ConfigService,
  ) {}

  /**
   * Prorratea cada insumo: (precioPaquete / cantidadComprada) * cantidadUsada.
   * Precio sugerido = costo unitario * (1 + margen), redondeado a múltiplos de $500 COP.
   */
  async registrarLote(dto: RegistrarLoteDto): Promise<ProductoEntity> {
    const margen =
      dto.margenGanancia ?? Number(this.config.get('MARGEN_GANANCIA_DEFAULT', 0.4));
    const multiplo = Number(this.config.get('REDONDEO_PRECIO_COP', 500));

    const snapshots: InsumoSnapshot[] = dto.insumos.map((insumo) => {
      if (insumo.cantidadUsada > insumo.cantidadComprada) {
        throw new BusinessException(
          `La cantidad usada de "${insumo.nombre}" no puede superar la cantidad comprada.`,
        );
      }
      const costoUnitarioPaquete = insumo.precioPaquete / insumo.cantidadComprada;
      const costoProrrateado = pesosEnteros(costoUnitarioPaquete * insumo.cantidadUsada);
      return {
        nombre: insumo.nombre,
        cantidadComprada: insumo.cantidadComprada,
        precioPaquete: insumo.precioPaquete,
        cantidadUsada: insumo.cantidadUsada,
        costoProrrateado,
      };
    });

    const costoTotalLote = snapshots.reduce((acc, i) => acc + i.costoProrrateado, 0);
    const costoUnitarioPorcion = pesosEnteros(costoTotalLote / dto.porciones);
    const precioSinRedondear = costoUnitarioPorcion * (1 + margen);
    const precioSugeridoVenta = redondearPrecioPopular(precioSinRedondear, multiplo);

    const producto = this.productos.create({
      nombre: dto.nombre,
      porciones: dto.porciones,
      margenGanancia: margen.toFixed(4),
      costoTotalLote,
      costoUnitarioPorcion,
      precioSugeridoVenta,
      insumosJson: snapshots,
      comercianteId: dto.comercianteId ?? 'unidad-parque-marruecos',
      metadatos: {
        formula: '(precioPaquete / cantidadComprada) * cantidadUsada',
        redondeoPopularCop: multiplo,
      },
      insumos: snapshots.map((s) => {
        const row = new InsumoEntity();
        row.nombre = s.nombre;
        row.cantidadComprada = String(s.cantidadComprada);
        row.precioPaquete = s.precioPaquete;
        row.cantidadUsada = String(s.cantidadUsada);
        row.costoProrrateado = s.costoProrrateado;
        row.metadatos = { origen: 'lote-produccion' };
        return row;
      }),
    });

    return this.productos.save(producto);
  }

  listar(): Promise<ProductoEntity[]> {
    return this.productos.findAll();
  }
}
