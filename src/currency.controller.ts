// src/currency.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('exchange')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('/calculate')
  calculateExchange(@Body() data: any) {
    return this.currencyService.calculateExchange(data);
  }
}
