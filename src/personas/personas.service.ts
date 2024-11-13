import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    try {
      return await this.personaModel.create(createPersonaDto);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Persona[]> {
    return this.personaModel.find();
  }

  async findOne(id: string): Promise<Persona> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID es invalido.`);
    }
    const persona = await this.personaModel.findById(id);
    if (!persona) {
      throw new NotFoundException(`Persona with ID ${id} not found`);
    }
    return persona;
  }

  async update(
    id: string,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID es invalido.`);
    }
    const updatedPersona = await this.personaModel.findByIdAndUpdate(
      id,
      updatePersonaDto,
      {
        new: true,
      },
    );
    if (!updatedPersona) {
      throw new NotFoundException(`Persona with ID ${id} not found`);
    }
    return updatedPersona;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID es invalido.`);
    }
    const { deletedCount } = await this.personaModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new NotFoundException(`Persona with ID ${id} not found`);
    }
  }
}
