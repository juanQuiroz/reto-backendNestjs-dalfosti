import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateExchangeRateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  monedaOrigen: string;

  @IsString()
  @MinLength(3)
  @MaxLength(3)
  monedaDestino: string;

  @IsNumber()
  monto: number;
}
