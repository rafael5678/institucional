import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AsistenciaDto,
  CrearCompraColectivaDto,
  CrearEncuentroDto,
  PrestamoEmergenciaDto,
} from '../dto/red-solidaria.dto';
import { CirculosSaberesService } from '../services/circulos-saberes.service';
import { ComprasColectivasService } from '../services/compras-colectivas.service';
import { FondoAhorroMutuoService } from '../services/fondo-ahorro-mutuo.service';

@ApiTags('red-solidaria')
@Controller('red-solidaria')
export class RedSolidariaController {
  constructor(
    private readonly compras: ComprasColectivasService,
    private readonly fondo: FondoAhorroMutuoService,
    private readonly circulos: CirculosSaberesService,
  ) {}

  @Post('compras-colectivas')
  @ApiOperation({ summary: 'Consolidar pedidos de insumos de varios comerciantes.' })
  crearCompra(@Body() dto: CrearCompraColectivaDto) {
    return this.compras.crear(dto);
  }

  @Get('compras-colectivas')
  listarCompras() {
    return this.compras.listar();
  }

  @Get('fondo')
  @ApiOperation({ summary: 'Saldo y movimientos de la caja común comunitaria.' })
  estadoFondo() {
    return this.fondo.estado();
  }

  @Post('fondo/prestamos')
  @ApiOperation({ summary: 'Préstamo de emergencia interno sin intereses gota a gota.' })
  prestar(@Body() dto: PrestamoEmergenciaDto) {
    return this.fondo.prestar(dto);
  }

  @Post('encuentros')
  @ApiOperation({ summary: 'Agendar círculo de saberes en el parque.' })
  programar(@Body() dto: CrearEncuentroDto) {
    return this.circulos.programar(dto);
  }

  @Get('encuentros')
  listarEncuentros() {
    return this.circulos.listar();
  }

  @Post('encuentros/:id/asistencia')
  @ApiOperation({ summary: 'Registrar asistencia a un encuentro.' })
  asistencia(@Param('id') id: string, @Body() dto: AsistenciaDto) {
    return this.circulos.registrarAsistencia(id, dto);
  }
}
