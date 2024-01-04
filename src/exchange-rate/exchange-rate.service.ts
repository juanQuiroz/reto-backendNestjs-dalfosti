import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ExchangeRate } from './entities/exchange-rate.entity';
// import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@Injectable()
export class ExchangeRateService implements OnModuleInit {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepository: Repository<ExchangeRate>,
  ) {}

  async onModuleInit() {
    await this.initializeData();
  }

  private async initializeData() {
    const existingData = await this.exchangeRateRepository.find();

    if (existingData.length === 0) {
      const seedData: Partial<ExchangeRate>[] = [
        { originCurrency: 'USD', targetCurrency: 'USD', rate: 1.0 }, // Dolares americanos
        { originCurrency: 'USD', targetCurrency: 'EUR', rate: 0.85 }, // Euros
        { originCurrency: 'USD', targetCurrency: 'PEN', rate: 4.0 }, // Soles
        { originCurrency: 'USD', targetCurrency: 'ARS', rate: 100.0 }, // Pesos argentinos
        { originCurrency: 'USD', targetCurrency: 'CLP', rate: 750.0 }, // Pesos chilenos
        { originCurrency: 'USD', targetCurrency: 'MXN', rate: 20.0 }, // Pesos mexicanos
        { originCurrency: 'USD', targetCurrency: 'COP', rate: 4000.0 }, // Pesos colombianos
        { originCurrency: 'USD', targetCurrency: 'BRL', rate: 5.3 }, // Reales
        { originCurrency: 'USD', targetCurrency: 'BOB', rate: 6.9 }, // Bolivianos
      ];

      await this.exchangeRateRepository.save(seedData);
    }
  }

  // create(createExchangeRateDto: CreateExchangeRateDto) {
  //   return 'This action adds a new exchangeRate';
  // }

  async calculateExchange(data: any) {
    const { monto, monedaOrigen, monedaDestino } = data;

    // search exchange rate in db
    const exchangeRateOrigin = await this.findExchangeRate(monedaOrigen);
    const exchangeRateTarget = await this.findExchangeRate(monedaDestino);

    // handling exceptions
    if (!exchangeRateOrigin || !exchangeRateTarget) {
      throw new NotFoundException('No se encontró la tasa de cambio.');
    }

    //Calculate amount with exchange rate
    const montoConTipoDeCambio =
      (monto / exchangeRateOrigin.rate) * exchangeRateTarget.rate;

    return {
      monto,
      montoConTipoDeCambio,
      monedaOrigen,
      monedaDestino,
      tipoDeCambio: exchangeRateTarget.rate,
    };
  }

  findAll() {
    return `This action returns all exchangeRate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exchangeRate`;
  }

  async update(
    targetCurrency: string,
    updateExchangeRateDto: UpdateExchangeRateDto,
  ) {
    const existingData = await this.exchangeRateRepository.find({
      where: { targetCurrency },
    });

    if (!existingData[0]) {
      throw new NotFoundException(
        `No se encontro la tasa de cambio ${targetCurrency}`,
      );
    }

    const toUpdate = {
      ...existingData[0],
      rate: updateExchangeRateDto.rate,
    };

    try {
      await this.exchangeRateRepository.update(
        { id: existingData[0].id },
        toUpdate,
      );
      return `Currency ${targetCurrency} updated successfully`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} exchangeRate`;
  }

  // finds the exchange rate
  private async findExchangeRate(currency: string): Promise<ExchangeRate> {
    return this.exchangeRateRepository.findOne({
      where: { originCurrency: 'USD', targetCurrency: currency },
    });
  }
}
