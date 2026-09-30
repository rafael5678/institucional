import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RegistrarFiadoDto } from '../dto/registrar-fiado.dto';
import { FiadosService } from '../services/fiados.service';

@ApiTags('fiados')
@Controller('fiados')
export class FiadosController {
  constructor(private readonly fiados: FiadosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar cuenta por cobrar (fiado) y generar enlace WhatsApp.' })
  registrar(@Body() dto: RegistrarFiadoDto) {
    return this.fiados.registrar(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar deudas.' })
  @ApiQuery({ name: 'pendientes', required: false })
  listar(@Query('pendientes') pendientes?: string) {
    return this.fiados.listar(pendientes === 'true' || pendientes === '1');
  }

  @Patch(':id/pagado')
  @ApiOperation({ summary: "Actualizar estado a PAGADO." })
  pagar(@Param('id') id: string) {
    return this.fiados.marcarPagado(id);
  }
}
