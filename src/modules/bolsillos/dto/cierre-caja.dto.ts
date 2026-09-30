import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CierreCajaDto {
  @ApiProperty({ example: 120000, description: 'Venta total del día en COP.' })
  @IsNumber()
  @Min(0)
  ventaTotalDia!: number;

  @ApiPropertyOptional({ example: 'unidad-parque-marruecos' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  comercianteId?: string;

  @ApiPropertyOptional({ example: '2026-09-29' })
  @IsOptional()
  @IsDateString()
  fechaCierre?: string;
}
