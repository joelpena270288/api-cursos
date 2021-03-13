import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import {ClaseService} from "./clase.service";
import {Clase} from "./clase.entity";


@Controller('clase')
export class ClaseController {
    
constructor(private readonly _claseService: ClaseService){

} 
@Get(':claseid')
 getClase(@Param('claseid', ParseIntPipe) claseid: number): Promise<Clase>{
    return this._claseService.get(claseid);
    
}
@Get()
 getAllClase(): Promise<Clase[]>{
  return this._claseService.getAll();
    
} 
@Post()
createClase(@Body() clase: Clase): Promise<Clase>{
 
  return this._claseService.create(clase); 
 
}
@Patch(':claseid')
updateclase(@Param('claseid', ParseIntPipe) claseid:number, @Body() clase: Clase){
 return this._claseService.update(claseid, clase);
  
}
@Delete(':cursoid')
deleteClase(@Param('claseid', ParseIntPipe) claseid: number){
 return this._claseService.delete(claseid); 
}
@Get('/byidmodulo/:idmodulo')
getAllClseByIdModulo(
  @Param('idmodulo', ParseIntPipe) idmodulo: number,
): Promise<Clase[]> {
  return this._claseService.getAllByIdModulo(idmodulo);
}
}
