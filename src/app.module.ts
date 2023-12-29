import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { ExchangeModule } from './exchange/exchange.module';

import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [ExchangeRate],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ExchangeRate]),
    ExchangeModule,
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class AppModule {}
