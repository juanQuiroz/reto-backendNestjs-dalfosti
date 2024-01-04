import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
// import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  // @Post()
  // create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
  //   return this.exchangeRateService.create(createExchangeRateDto);
  // }

  @Post('/calculate')
  calculateExchange(@Body() data: any) {
    return this.exchangeRateService.calculateExchange(data);
  }

  @Get()
  findAll() {
    return this.exchangeRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeRateService.findOne(+id);
  }

  @Patch(':targetCurrency')
  update(
    @Param('targetCurrency') targetCurrency: string,
    @Body() updateExchangeRateDto: UpdateExchangeRateDto,
  ) {
    return this.exchangeRateService.update(
      targetCurrency,
      updateExchangeRateDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeRateService.remove(+id);
  }
}
