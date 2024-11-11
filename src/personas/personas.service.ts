import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Persona } from './entities/persona.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class PersonasService {
  constructor(
    @InjectModel(Persona.name)
    private readonly personaModel: Model<Persona>,
  ) {}
  async create(createPersonaDto: CreatePersonaDto) {
    try {
      return await this.personaModel.create(createPersonaDto);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return this.personaModel.find();
  }

  async findOne(id: string) {
    let persona: Persona;
    if (isValidObjectId(id)) {
      persona = await this.personaModel.findById(id);
    }
    if (!persona) throw new NotFoundException(`Persona with id ${id} not found`);
    return persona;
  }

  async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    let persona: Persona;
    if (isValidObjectId(id)) {
      persona = await this.findOne(id);
    }
    try {
      await persona.updateOne(updatePersonaDto);
      return { ok: true, message: 'Registro actualizado con exito.' };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.personaModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new NotFoundException(`Persona with id ${id} not found`);
    return;
  }
}
