import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DocumentoRepository } from './documento.repository';
  import { Documento } from './documento.entity';
@Injectable()
export class DocumentoService {
    constructor(
        @InjectRepository(DocumentoRepository)
        private readonly _documentoRepository: DocumentoRepository,
      ) {}
      async create(documento: Documento): Promise<Documento> {
        const savedDocumento: Documento = await this._documentoRepository.save(documento);
        return savedDocumento;
      }
      async getAllByIdClase(actividadid: number): Promise<Documento[]> {
        const documento: Documento[] = await this._documentoRepository.find({
          where: { actividad: actividadid },
        });
        return documento;
      }
}
