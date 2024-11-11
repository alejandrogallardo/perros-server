import { Test, TestingModule } from '@nestjs/testing';
import { PersonasService } from './personas.service';
import { getModelToken } from '@nestjs/mongoose';
import { Persona } from './entities/persona.entity';
import { NotFoundException } from '@nestjs/common';

describe('PersonasService', () => {
  let service: PersonasService;
  let personaModel: any;

  const mockPersona = {
    _id: '1234567890abcdef',
    nombres: 'Juan Perez',
    direccion: 'Calle Falsa 123',
    telefono: '1234567890',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockPersonaModel = {
    create: jest.fn().mockResolvedValue(mockPersona),
    find: jest.fn().mockResolvedValue([mockPersona]),
    findById: jest.fn().mockResolvedValue(mockPersona),
    updateOne: jest.fn().mockResolvedValue(mockPersona),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonasService,
        {
          provide: getModelToken(Persona.name),
          useValue: mockPersonaModel,
        },
      ],
    }).compile();

    service = module.get<PersonasService>(PersonasService);
    personaModel = module.get(getModelToken(Persona.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a persona', async () => {
    const createPersonaDto = {
      nombres: 'Juan Perez',
      direccion: 'Calle Falsa 123',
      telefono: '1234567890',
    };
    const result = await service.create(createPersonaDto);
    expect(result).toEqual(mockPersona);
    expect(personaModel.create).toHaveBeenCalledWith(createPersonaDto);
  });

  it('should return all personas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockPersona]);
    expect(personaModel.find).toHaveBeenCalled();
  });

  /*xit('should return a persona by id', async () => {
    const result = await service.findOne('1234567890abcdef');
    expect(result).toEqual(mockPersona);
    expect(personaModel.findById).toHaveBeenCalledWith('1234567890abcdef');
  });*/

  it('should throw NotFoundException if persona not found', async () => {
    personaModel.findById.mockResolvedValueOnce(null);
    await expect(service.findOne('invalid_id')).rejects.toThrow(
      NotFoundException,
    );
  });

  /*xit('should update a persona', async () => {
    const updatePersonaDto = { direccion: 'Calle Nueva 456' };
    const result = await service.update('1234567890abcdef', updatePersonaDto);
    expect(result).toEqual({ ok: true, message: 'Registro actualizado con exito.' });
    expect(personaModel.updateOne).toHaveBeenCalledWith(updatePersonaDto);
  });*/

  it('should delete a persona', async () => {
    await service.remove('1234567890abcdef');
    expect(personaModel.deleteOne).toHaveBeenCalledWith({
      _id: '1234567890abcdef',
    });
  });

  it('should throw NotFoundException if persona not found for delete', async () => {
    personaModel.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });
    await expect(service.remove('invalid_id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
