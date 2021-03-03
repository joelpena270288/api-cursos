import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCursoController } from '../estado-curso.controller';

describe('EstadoCursoController', () => {
  let controller: EstadoCursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoCursoController],
    }).compile();

    controller = module.get<EstadoCursoController>(EstadoCursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
