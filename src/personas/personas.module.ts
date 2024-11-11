import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Persona, PersonaSchema } from './entities/persona.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Persona.name,
        schema: PersonaSchema,
      },
    ]),
  ],
  controllers: [PersonasController],
  providers: [PersonasService],
})
export class PersonasModule {}
