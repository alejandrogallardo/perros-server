import { Test, TestingModule } from '@nestjs/testing';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { CreatePersonaDto } from './dto/create-persona.dto';

describe('PersonasController', () => {
  let controller: PersonasController;
  let service: PersonasService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonasController],
      providers: [
        {
          provide: PersonasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PersonasController>(PersonasController);
    service = module.get<PersonasService>(PersonasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a persona', async () => {
    const createPersonaDto: CreatePersonaDto = {
      nombres: 'Juan',
      direccion: 'Calle Falsa',
      telefono: '1234567890',
    };
    const mockResponse = { _id: '123', ...createPersonaDto };
    mockService.create.mockResolvedValue(mockResponse);

    const result = await controller.create(createPersonaDto);
    expect(result).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(createPersonaDto);
  });

  it('should return all personas', async () => {
    const mockResponse = [{ _id: '123', nombres: 'Juan' }];
    mockService.findAll.mockResolvedValue(mockResponse);

    const result = await controller.findAll();
    expect(result).toEqual(mockResponse);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a persona by id', async () => {
    const mockResponse = { _id: '123', nombres: 'Juan' };
    mockService.findOne.mockResolvedValue(mockResponse);

    const result = await controller.findOne('123');
    expect(result).toEqual(mockResponse);
    expect(service.findOne).toHaveBeenCalledWith('123');
  });

  it('should update a persona', async () => {
    const updatePersonaDto: UpdatePersonaDto = { direccion: 'Nueva Calle 456' };
    const mockResponse = {
      ok: true,
      message: 'Registro actualizado con exito.',
    };
    mockService.update.mockResolvedValue(mockResponse);

    const result = await controller.update('123', updatePersonaDto);
    expect(result).toEqual(mockResponse);
    expect(service.update).toHaveBeenCalledWith('123', updatePersonaDto);
  });

  it('should delete a persona', async () => {
    mockService.remove.mockResolvedValue(undefined);

    await controller.remove('123');
    expect(service.remove).toHaveBeenCalledWith('123');
  });
});
