import { UltimaClaseController } from './ultima-clase.controller';
import { UltimaClaseService } from './ultima-clase.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UltimaClaseController],
  providers: [UltimaClaseService],
})
export class UltimaClaseModule {}
