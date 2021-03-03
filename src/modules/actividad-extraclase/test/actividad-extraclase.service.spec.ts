import { Test, TestingModule } from '@nestjs/testing';
import { ActividadExtraclaseService } from '../actividad-extraclase.service';

describe('ActividadExtraclaseService', () => {
  let service: ActividadExtraclaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActividadExtraclaseService],
    }).compile();

    service = module.get<ActividadExtraclaseService>(ActividadExtraclaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
