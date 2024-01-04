import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRate } from './entities/exchange-rate.entity';

@Module({
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService],
  imports: [TypeOrmModule.forFeature([ExchangeRate])],
  exports: [ExchangeRateService, TypeOrmModule],
})
export class ExchangeRateModule {}
