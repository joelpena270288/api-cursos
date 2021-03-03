
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {status} from '../../shared/entity-status.enum';
import {CursoRepository} from "./curso.repository";
import {Curso} from "./curso.entity";

@Injectable()
export class CursoService {
    constructor(
        @InjectRepository(CursoRepository)
        private readonly  _cursoRepository: CursoRepository,
              
    ){}
    async create(curso:Curso ): Promise<Curso>{        
        const savedCurso: Curso = await this._cursoRepository.save(curso);
        return curso; 
      }
    async get(id: number): Promise<Curso>{
        if(!id){
          throw new BadRequestException("id must be sent");  
        }
        const curso: Curso = await this._cursoRepository.findOne(id,{
           where: {status: status.ACTIVE},
         });
         if(!curso){
           throw new NotFoundException("this course does not found");  
         }
         return curso;

    }
    async getAll(): Promise<Curso[]>{
       
        const curso: Curso[] = await this._cursoRepository.find({
           where: {status: status.ACTIVE},
         });
        
         return curso;

    }
   
    async update(cursoid: number, curso: Curso): Promise<Curso>{
     
      const foundcurso = await this._cursoRepository.findOne(cursoid, {where:{status: "ACTIVE"}});
      if(!foundcurso){
        throw new NotFoundException("user not exist");
      }
      foundcurso.nombre = curso.nombre;
      foundcurso.nota = curso.nota;
      foundcurso.precio = curso.precio;
      const updatecurso = await this._cursoRepository.save(foundcurso);  
      return updatecurso;  
    }
    async delete(cursoId: number): Promise<boolean>{
      const cursoExist = await this._cursoRepository.findOne(cursoId,{where: {status: 'ACTIVE'}});
      if(!cursoExist){
        throw new NotFoundException('Course does not exist');
      }
      await this._cursoRepository.update(cursoId, {status: status.INACTIVE});
      return true;
    }

}
