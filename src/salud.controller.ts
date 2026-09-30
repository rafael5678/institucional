import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('salud')
@Controller('salud')
export class SaludController {
  @Get()
  ping() {
    return {
      servicio: 'MiPyme Marruecos',
      estado: 'ok',
      mensaje: 'Red Popular de Gestión y Costeo en línea',
    };
  }
}
