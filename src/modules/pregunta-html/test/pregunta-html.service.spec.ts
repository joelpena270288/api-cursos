import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaHtmlService } from '../pregunta-html.service';

describe('PreguntaHtmlService', () => {
  let service: PreguntaHtmlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreguntaHtmlService],
    }).compile();

    service = module.get<PreguntaHtmlService>(PreguntaHtmlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
