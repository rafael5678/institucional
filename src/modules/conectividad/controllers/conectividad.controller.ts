import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConectividadService } from '../services/conectividad.service';

@ApiTags('conectividad')
@Controller('conectividad')
export class ConectividadController {
  constructor(private readonly conectividad: ConectividadService) {}

  @Get('convocatorias')
  @ApiOperation({
    summary: 'Catálogo de convocatorias públicas vigentes y enlaces de postulación.',
  })
  catalogo() {
    return this.conectividad.catalogoVigente();
  }
}
