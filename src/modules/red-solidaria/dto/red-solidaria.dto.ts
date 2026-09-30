import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class PedidoInsumoDto {
  @ApiProperty({ example: 'reposteria-bloque-2' })
  @IsString()
  comercianteId!: string;

  @ApiProperty({ example: 'Queso crema' })
  @IsString()
  insumo!: string;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @IsPositive()
  cantidad!: number;

  @ApiProperty({ example: 'g' })
  @IsString()
  unidad!: string;

  @ApiPropertyOptional({ example: 24000, description: 'Precio de paquete al detal en COP.' })
  @IsOptional()
  @IsNumber()
  precioReferenciaRetail?: number;
}

export class CrearCompraColectivaDto {
  @ApiProperty({ example: 'Compra semanal de lácteos — Parque Marruecos' })
  @IsString()
  @MinLength(5)
  titulo!: string;

  @ApiProperty({ type: [PedidoInsumoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoInsumoDto)
  pedidos!: PedidoInsumoDto[];
}

export class PrestamoEmergenciaDto {
  @ApiProperty({ example: 'unidad-parque-marruecos' })
  @IsString()
  comercianteId!: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(1)
  monto!: number;

  @ApiPropertyOptional({ example: 'Urgencia de nevera para lácteos' })
  @IsOptional()
  @IsString()
  motivo?: string;
}

export class CrearEncuentroDto {
  @ApiProperty({ example: 'Círculo de saberes: costeo de cheesecake' })
  @IsString()
  titulo!: string;

  @ApiPropertyOptional({ example: 'Parque Marruecos' })
  @IsOptional()
  @IsString()
  lugar?: string;

  @ApiProperty({ example: '2026-10-04T15:00:00-05:00' })
  @IsDateString()
  fechaHora!: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsNumber()
  cupo?: number;

  @ApiPropertyOptional({ example: ['Prorrateo de insumos', 'Bolsillos solidarios'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  saberes?: string[];
}

export class AsistenciaDto {
  @ApiProperty({ example: 'Doña Helena' })
  @IsString()
  nombre!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comercianteId?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  presente!: boolean;
}
