import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentoRepository } from './documento.repository';
import { Documento } from './documento.entity';
import { User } from '../user/user.entity';
@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(DocumentoRepository)
    private readonly _documentoRepository: DocumentoRepository,
  ) {}
  async create(documento: Documento): Promise<Documento> {
    const savedDocumento: Documento = await this._documentoRepository.save(
      documento,
    );
    return savedDocumento;
  }
  async getAllByIdClase(actividadid: string): Promise<Documento[]> {
    const documento: Documento[] = await this._documentoRepository.find({
      where: { actividad: actividadid },
    });
    return documento;
  }
  async update(
    iddocumento: string,
    documento: Documento,
    user: User,
  ): Promise<boolean> {
    const documentofound = await this._documentoRepository
      .createQueryBuilder('documento')
      .innerJoin('documento.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('documento.id = :iddocumento', { iddocumento: iddocumento })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();
    if (!documentofound) {
      throw new NotFoundException('this Document does not found');
    }
    documentofound.nombre = documento.nombre;
    documentofound.link = documento.link;
    documentofound.updatedAt = new Date();

    let saveddocumento;
    try {
      saveddocumento = await this._documentoRepository.save(documentofound);
    } catch (e) {
      console.log(e);
    }
    if (!saveddocumento) {
      throw new NotFoundException('Dont was saved document');
    }
    return true;
  }
  async delete(documentoid: string, user: User): Promise<boolean> {
    const documentoFound = await this._documentoRepository
      .createQueryBuilder('documento')
      .innerJoin('documento.actividad', 'actividad')
      .innerJoin('actividad.clase', 'clase')
      .innerJoin('clase.modulo', 'modulo')
      .innerJoin('modulo.curso', 'curso')
      .innerJoin('curso.dashboard', 'dashboard')
      .where('documento.id = :documentoid', { documentoid: documentoid })
      .andWhere('dashboard.user = :user', { user: user.id })
      .getOne();

    if (!documentoFound) {
      throw new NotFoundException('Document does not exist');
    }
    await this._documentoRepository.delete(documentoFound);
    return true;
  }
}
