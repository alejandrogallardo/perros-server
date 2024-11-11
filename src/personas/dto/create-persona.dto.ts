import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePersonaDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase().trim())
  nombres: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  direccion: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  @MinLength(8)
  telefono: string;
}
