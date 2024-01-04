import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateExchangeRateDto {
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  originCurrency?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(3)
  targetCurrency?: string;

  @IsNumber()
  rate: number;
}
