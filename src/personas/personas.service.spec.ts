import { Test, TestingModule } from '@nestjs/testing';
import { PersonasService } from './personas.service';
import { getModelToken } from '@nestjs/mongoose';
import { Persona } from './entities/persona.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PersonasService', () => {
  let service: PersonasService;
  let personaModel: any;

  const mockPersona = {
    _id: '507f1f77bcf86cd799439011',
    nombres: 'Juan Perez',
    direccion: 'Calle Falsa 123',
    telefono: '12345678',
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockPersonaModel = {
    create: jest.fn().mockResolvedValue(mockPersona),
    find: jest.fn().mockResolvedValue([mockPersona]),
    findById: jest.fn().mockResolvedValue(mockPersona),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockPersona),
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

  it('should return a persona by id', async () => {
    const result = await service.findOne('507f1f77bcf86cd799439011');
    expect(result).toEqual(mockPersona);
    expect(personaModel.findById).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011',
    );
  });

  it('should throw BadRequestException if ID is invalid for findOne', async () => {
    await expect(service.findOne('invalidId')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException if persona not found for findOne', async () => {
    personaModel.findById.mockResolvedValueOnce(null);
    await expect(service.findOne('507f1f77bcf86ce799439011')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a persona', async () => {
    const updatePersonaDto = { direccion: 'Calle Nueva 456' };
    const result = await service.update(mockPersona._id, updatePersonaDto);
    expect(result).toEqual(mockPersona);
    expect(mockPersonaModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockPersona._id,
      updatePersonaDto,
      { new: true },
    );
  });

  it('should throw BadRequestException if ID is invalid for update', async () => {
    const updatePersonaDto = { direccion: 'Calle Nueva 456' };
    await expect(service.update('invalidId', updatePersonaDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException if persona not found for update', async () => {
    const updatePersonaDto = { direccion: 'Calle Nueva 456' };
    personaModel.findByIdAndUpdate.mockResolvedValueOnce(null);
    await expect(
      service.update('507f1f77bcf86ce799439011', updatePersonaDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a persona', async () => {
    await service.remove('507f1f77bcf86cd799439011');
    expect(personaModel.deleteOne).toHaveBeenCalledWith({
      _id: '507f1f77bcf86cd799439011',
    });
  });

  it('should throw BadRequestException if persona ID is invalid for delete', async () => {
    await expect(service.remove('invalidId')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException if persona not found for delete', async () => {
    personaModel.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });
    await expect(service.remove('507f1f77bcf86ce799439011')).rejects.toThrow(
      NotFoundException,
    );
  });
});
