import { Module } from '@nestjs/common';
import { ClasePasadaController } from './clase-pasada.controller';
import { ClasePasadaService } from './clase-pasada.service';

@Module({
  imports: [],
  controllers: [ClasePasadaController],
  providers: [ClasePasadaService],
})
export class ClasePasadaModule {}
