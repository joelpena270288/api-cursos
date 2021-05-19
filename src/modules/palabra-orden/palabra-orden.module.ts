import { PalabraOrdenService } from './palabra-orden.service';
import { PalabraOrdenController } from './palabra-orden.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PalabraOrdenController],
  providers: [PalabraOrdenService],
})
export class PalabraOrdenModule {}
