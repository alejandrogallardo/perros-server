import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Perro {
  @Prop({
    maxlength: 20,
    minlength: 3,
    required: true,
  })
  nombre: string;

  @Prop({
    maxlength: 20,
    minlength: 3,
    required: false,
  })
  raza: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}
export const PerroSchema = SchemaFactory.createForClass(Perro);
