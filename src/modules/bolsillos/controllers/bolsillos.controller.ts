import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CierreCajaDto } from '../dto/cierre-caja.dto';
import { BolsillosService } from '../services/bolsillos.service';

@ApiTags('bolsillos')
@Controller('bolsillos')
export class BolsillosController {
  constructor(private readonly bolsillos: BolsillosService) {}

  @Post('cierre-diario')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cierre diario de caja y distribución solidaria de bolsillos.' })
  cerrar(@Body() dto: CierreCajaDto) {
    return this.bolsillos.cerrarCaja(dto);
  }

  @Get('historial')
  @ApiOperation({ summary: 'Historial financiero del comerciante.' })
  historial() {
    return this.bolsillos.listarHistorial();
  }
}
