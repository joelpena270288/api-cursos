import { Test, TestingModule } from '@nestjs/testing';
import { EstadoCursoService } from '../estado-curso.service';

describe('EstadoCursoService', () => {
  let service: EstadoCursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoCursoService],
    }).compile();

    service = module.get<EstadoCursoService>(EstadoCursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
