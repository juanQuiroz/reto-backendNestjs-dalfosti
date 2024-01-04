import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// import { ExchangeModule } from './exchange/exchange.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { ExchangeRate } from './exchange-rate/entities/exchange-rate.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [ExchangeRate],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ExchangeRate]),
    // ExchangeModule,
    ExchangeRateModule,
  ],
})
export class AppModule {}
