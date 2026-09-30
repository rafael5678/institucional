import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { BolsillosService } from '../../modules/bolsillos/services/bolsillos.service';
import { CosteoService } from '../../modules/costeo/services/costeo.service';
import { ProductoRepository } from '../../modules/costeo/repositories/producto.repository';
import { FiadosService } from '../../modules/fiados/services/fiados.service';
import { CirculosSaberesService } from '../../modules/red-solidaria/services/circulos-saberes.service';
import { ComprasColectivasService } from '../../modules/red-solidaria/services/compras-colectivas.service';
import { EncuentroRepository } from '../../modules/red-solidaria/repositories/red-solidaria.repository';

/**
 * Datos de prueba: lote de Cheesecake ($18.000 / $1.500 / $2.500)
 * y cierre diario de $120.000 COP.
 */
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly log = new Logger(SeedService.name);

  constructor(
    private readonly productos: ProductoRepository,
    private readonly costeo: CosteoService,
    private readonly bolsillos: BolsillosService,
    private readonly fiados: FiadosService,
    private readonly compras: ComprasColectivasService,
    private readonly encuentros: CirculosSaberesService,
    private readonly encuentroRepo: EncuentroRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const existentes = await this.productos.findAll();
    if (existentes.length > 0) {
      this.log.log('Seed omitido: ya hay lotes de costeo.');
      return;
    }

    const lote = await this.costeo.registrarLote({
      nombre: 'Cheesecake porción Parque Marruecos',
      porciones: 12,
      margenGanancia: 0.4,
      comercianteId: 'cheesecake-parque-marruecos',
      insumos: [
        { nombre: 'Queso crema', cantidadComprada: 1000, precioPaquete: 24000, cantidadUsada: 500 },
        { nombre: 'Galleta', cantidadComprada: 400, precioPaquete: 8000, cantidadUsada: 200 },
        { nombre: 'Mantequilla', cantidadComprada: 250, precioPaquete: 8000, cantidadUsada: 62.5 },
      ],
    });
    this.log.log(
      `Seed costeo: lote=${lote.costoTotalLote} unitario=${lote.costoUnitarioPorcion} sugerido=${lote.precioSugeridoVenta}`,
    );

    const cierre = await this.bolsillos.cerrarCaja({
      ventaTotalDia: 120000,
      comercianteId: 'cheesecake-parque-marruecos',
      fechaCierre: '2026-09-29',
    });
    this.log.log(
      `Seed bolsillos: venta=${cierre.ventaTotalDia} reserva=${cierre.bolsilloReserva} fondo=${cierre.aporteFondoComunitario}`,
    );

    await this.fiados.registrar({
      cliente: 'Doña Rosa de la 27',
      telefonoWhatsapp: '3001112233',
      montoFiado: 15000,
      fechaLimitePago: '2026-10-06',
      fechaRegistro: '2026-09-29',
      comercianteId: 'cheesecake-parque-marruecos',
    });

    await this.compras.crear({
      titulo: 'Compra colectiva de lácteos — Parque Marruecos',
      pedidos: [
        {
          comercianteId: 'cheesecake-parque-marruecos',
          insumo: 'Queso crema',
          cantidad: 2000,
          unidad: 'g',
          precioReferenciaRetail: 24000,
        },
        {
          comercianteId: 'arepas-la-esquina',
          insumo: 'Queso crema',
          cantidad: 1000,
          unidad: 'g',
          precioReferenciaRetail: 24000,
        },
        {
          comercianteId: 'postres-bloque-4',
          insumo: 'Mantequilla',
          cantidad: 500,
          unidad: 'g',
          precioReferenciaRetail: 8000,
        },
      ],
    });

    const yaHayEncuentros = await this.encuentroRepo.findAll();
    if (yaHayEncuentros.length === 0) {
      await this.encuentros.programar({
        titulo: 'Círculo de saberes: costeo de cheesecake y bolsillos',
        lugar: 'Parque Marruecos',
        fechaHora: '2026-10-04T15:00:00-05:00',
        cupo: 25,
        saberes: ['Prorrateo de insumos', 'Reparto de bolsillos', 'Fiados por WhatsApp'],
      });
    }

    this.log.log('Seed inicial completado.');
  }
}
