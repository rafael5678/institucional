import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class InsumoItemDto {
  @ApiProperty({ example: 'Queso crema' })
  @IsString()
  @MinLength(2)
  nombre!: string;

  @ApiProperty({ example: 1000, description: 'Cantidad comprada del paquete (g, ml, und).' })
  @IsNumber()
  @IsPositive()
  cantidadComprada!: number;

  @ApiProperty({ example: 24000, description: 'Precio del paquete en COP.' })
  @IsNumber()
  @Min(0)
  precioPaquete!: number;

  @ApiProperty({ example: 500, description: 'Cantidad realmente usada en el lote.' })
  @IsNumber()
  @IsPositive()
  cantidadUsada!: number;
}

/**
 * Acepta objetos {nombre,...} o tuplas [nombre, cantidadComprada, precioPaquete, cantidadUsada].
 */
export class RegistrarLoteDto {
  @ApiProperty({ example: 'Cheesecake porción Parque Marruecos' })
  @IsString()
  @MinLength(3)
  nombre!: string;

  @ApiProperty({ example: 12, description: 'Número de porciones del lote.' })
  @IsNumber()
  @IsPositive()
  porciones!: number;

  @ApiPropertyOptional({ example: 0.4, description: 'Margen de ganancia. Por defecto 40%.' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  margenGanancia?: number;

  @ApiPropertyOptional({ example: 'unidad-parque-marruecos' })
  @IsOptional()
  @IsString()
  comercianteId?: string;

  @ApiProperty({
    description: 'Insumos como objetos o como tuplas [nombre, cantComprada, precioPaquete, cantUsada]',
    example: [
      ['Queso crema', 1000, 24000, 500],
      ['Galleta', 400, 8000, 200],
      ['Mantequilla', 250, 8000, 62.5],
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      return value;
    }
    return value.map((item: unknown) => {
      if (Array.isArray(item) && item.length >= 4) {
        const [nombre, cantidadComprada, precioPaquete, cantidadUsada] = item;
        return { nombre, cantidadComprada, precioPaquete, cantidadUsada };
      }
      return item;
    });
  })
  @ValidateNested({ each: true })
  @Type(() => InsumoItemDto)
  insumos!: InsumoItemDto[];
}
