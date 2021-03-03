import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CursoService } from "./curso.service";
import {Curso} from "./curso.entity";
import {ReadCursoDto} from "./dto/read-curso.dto";
@Controller('curso')
export class CursoController{ 
constructor(private readonly _cursoService: CursoService){

} 
@Get(':cursoid')
 getCurso(@Param('cursoid', ParseIntPipe) cursoid: number): Promise<ReadCursoDto>{
    return this._cursoService.get(cursoid);
    
}
@Get()
 getAllCurso(): Promise<ReadCursoDto[]>{
  return this._cursoService.getAll();
    
} 
@Post()
createCurso(@Body() curso: Curso): Promise<Curso>{
 
  return this._cursoService.create(curso); 
 
}
@Patch(':cursoid')
updateRole(@Param('cursoid', ParseIntPipe) cursoid:number, @Body() role: Curso){
 return this._cursoService.update(cursoid, role);
  
}
@Delete(':cursoid')
deleteRole(@Param('cursoid', ParseIntPipe) cursoid: number){
 return this._cursoService.delete(cursoid); 
}
}
