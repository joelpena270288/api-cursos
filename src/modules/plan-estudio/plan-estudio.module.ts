import { PlanEstudioService } from './plan-estudio.service';
import { PlanEstudioController } from './plan-estudio.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        PlanEstudioController,],
    providers: [
        PlanEstudioService, ],
})
export class PlanEstudioModule { }
