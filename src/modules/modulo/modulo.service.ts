import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {status} from '../../shared/entity-status.enum';
import { plainToClass } from 'class-transformer';
import {ModuloRepository} from "./modulo.repository";
import {Modulo} from "./modulo.entity";
import {CursoRepository} from "../curso/curso.repository";
import {Curso} from "../curso/curso.entity";


@Injectable()
export class ModuloService {
    constructor(
        @InjectRepository(ModuloRepository)
        private readonly  _moduloRepository: ModuloRepository,
        @InjectRepository(CursoRepository)
        private readonly  _cursoRepository: CursoRepository,
              
    ){}
    async create(idcurso:number, modulo:Modulo ): Promise<Modulo>{ 
        const founcurso:Curso = await this._cursoRepository.findOne(idcurso);
        if(!founcurso){
            throw new BadRequestException("Course not exists");
        }  
        modulo.curso_Id = idcurso;     
        const savedModulo: Modulo = await this._moduloRepository.save(modulo);
        return modulo; 
      }
    async get(moduloid: number): Promise<Modulo>{
        if(!moduloid){
          throw new BadRequestException("id must be sent");  
        }
        const modulo: Modulo = await this._moduloRepository.findOne(moduloid,{
           where: {status: status.ACTIVE},
         });
         if(!modulo){
           throw new NotFoundException("this module does not found");  
         }
         return modulo;

    }
    async getAll(): Promise<Modulo[]>{
       
        const modulo: Modulo[] = await this._moduloRepository.find({
           where: {status: status.ACTIVE},
         });
         return modulo;
         

    }
   
    async update(moduloid: number, modulo: Modulo): Promise<Modulo>{
     
      const foundmodulo = await this._moduloRepository.findOne(moduloid, {where:{status: "ACTIVE"}});
      if(!foundmodulo){
        throw new NotFoundException("module not exist");
      }
      foundmodulo.nombre = modulo.nombre;
      foundmodulo.nota = modulo.nota;
      foundmodulo.descripcion = modulo.descripcion;
      const updatemodulo = await this._moduloRepository.save(foundmodulo);  
      return updatemodulo;  
    }
    async delete(moduloId: number): Promise<boolean>{
      const moduloExist = await this._moduloRepository.findOne(moduloId,{where: {status: 'ACTIVE'}});
      if(!moduloExist){
        throw new NotFoundException('Module does not exist');
      }
      await this._moduloRepository.update(moduloId, {status: status.INACTIVE});
      return true;
    }

}
