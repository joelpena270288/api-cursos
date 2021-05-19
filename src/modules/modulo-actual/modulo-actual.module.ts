import { ModuloActualService } from './modulo-actual.service';
import { ModuloActualController } from './modulo-actual.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ModuloActualController, ModuloActualController],
  providers: [ModuloActualService],
})
export class ModuloActualModule {}
