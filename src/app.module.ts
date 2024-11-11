import { Module } from '@nestjs/common';
import { PerrosModule } from './perros/perros.module';
import { PersonasModule } from './personas/personas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${envs.dbHost}:${envs.dbPort}`, {
      dbName: envs.dbName,
      user: envs.dbUser,
      pass: envs.dbPass,
    }),
    PerrosModule,
    PersonasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
