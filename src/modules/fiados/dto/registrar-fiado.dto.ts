import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Matches, Min, MinLength } from 'class-validator';

export class RegistrarFiadoDto {
  @ApiProperty({ example: 'Doña Rosa de la 27' })
  @IsString()
  @MinLength(2)
  cliente!: string;

  @ApiProperty({ example: '3001112233', description: 'Celular colombiano sin indicativo.' })
  @IsString()
  @Matches(/^\d{10}$/)
  telefonoWhatsapp!: string;

  @ApiProperty({ example: 15000 })
  @IsNumber()
  @Min(1)
  montoFiado!: number;

  @ApiProperty({ example: '2026-10-06' })
  @IsDateString()
  fechaLimitePago!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fechaRegistro?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comercianteId?: string;
}
