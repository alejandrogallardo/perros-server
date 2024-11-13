import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Persona extends Document {
  @Prop({
    maxlength: 50,
    minlength: 3,
    required: true,
  })
  nombres: string;

  @Prop({
    maxlength: 50,
    minlength: 3,
    required: false,
  })
  direccion: string;

  @Prop({
    maxlength: 17,
    minlength: 8,
    required: false,
  })
  telefono: string;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);
