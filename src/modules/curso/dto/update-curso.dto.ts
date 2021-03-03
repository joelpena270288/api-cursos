import { Type } from "class-transformer";
import {IsNumber, IsString } from "class-validator";

   export class UpdateCursoDto{
    @IsString()
    readonly nombre: string;
    @IsNumber()
    readonly nota: number;
    @IsNumber()
    readonly precio: number;
    @IsString()
    readonly descripcion: string;
    @IsString()
    readonly fecha_inicio_incripcion: string;
    @IsString()
    readonly fecha_fin_incripcion: string;
   


}