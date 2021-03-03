import { Test, TestingModule } from '@nestjs/testing';
import { ActividadExtraclaseController } from '../actividad-extraclase.controller';

describe('ActividadExtraclaseController', () => {
  let controller: ActividadExtraclaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActividadExtraclaseController],
    }).compile();

    controller = module.get<ActividadExtraclaseController>(ActividadExtraclaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
