import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaHtmlController } from '../pregunta-html.controller';

describe('PreguntaHtmlController', () => {
  let controller: PreguntaHtmlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreguntaHtmlController],
    }).compile();

    controller = module.get<PreguntaHtmlController>(PreguntaHtmlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
