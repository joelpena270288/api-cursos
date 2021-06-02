import { ExamenFinalService } from './examen-final.service';
import { ExamenFinalController } from './examen-final.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ExamenFinalController],
  providers: [
        ExamenFinalService, ],
})
export class ExamenFinalModule {}
