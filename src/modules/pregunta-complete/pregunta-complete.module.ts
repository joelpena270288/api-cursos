import { PreguntaCompleteService } from './pregunta-complete.service';
import { PreguntaCompleteController } from './pregunta-complete.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PreguntaCompleteController],
  providers: [PreguntaCompleteService],
})
export class PreguntaCompleteModule {}
