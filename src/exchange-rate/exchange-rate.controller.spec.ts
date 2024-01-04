import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateController } from './exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateController', () => {
  let controller: ExchangeRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRateController],
      providers: [ExchangeRateService],
    }).compile();

    controller = module.get<ExchangeRateController>(ExchangeRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it(`/POST exchange`, () => {
  //   expect(
  //     controller.calculateExchange({
  //       monto: 10,
  //       monedaOrigen: 'USD',
  //       monedaDestino: 'COP',
  //     }),
  //   ).toEqual({
  //     monto: 20,
  //     montoConTipoDeCambio: 5,
  //     monedaOrigen: 'PEN',
  //     monedaDestino: 'USD',
  //     tipoDeCambio: 1,
  //   });
  // });
});
