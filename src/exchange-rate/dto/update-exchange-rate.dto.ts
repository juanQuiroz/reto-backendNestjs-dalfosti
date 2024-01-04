import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeRateDto } from './create-exchange-rate.dto';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateExchangeRateDto extends PartialType(CreateExchangeRateDto) {
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
