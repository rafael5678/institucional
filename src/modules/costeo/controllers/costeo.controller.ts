import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegistrarLoteDto } from '../dto/registrar-lote.dto';
import { CosteoService } from '../services/costeo.service';

@ApiTags('costeo')
@Controller('costeo')
export class CosteoController {
  constructor(private readonly costeo: CosteoService) {}

  @Post('lotes')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar lote de producción e insumos y calcular precios.' })
  registrar(@Body() dto: RegistrarLoteDto) {
    return this.costeo.registrarLote(dto);
  }

  @Get('lotes')
  @ApiOperation({ summary: 'Listar lotes costados.' })
  listar() {
    return this.costeo.listar();
  }
}
