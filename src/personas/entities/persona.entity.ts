import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
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

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);

PersonaSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  this.updated_at = new Date();
  next();
});

PersonaSchema.pre('updateOne', function (next) {
  this.set({ updated_at: new Date() });
  next();
});
