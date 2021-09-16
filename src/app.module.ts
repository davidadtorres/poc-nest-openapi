import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PetsModule } from './pets/pets.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    PetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
