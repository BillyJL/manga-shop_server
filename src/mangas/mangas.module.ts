import { Module } from '@nestjs/common';
import { MangasController } from './mangas.controller';
import { MangasService } from './mangas.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Manga } from './mangas.model';

@Module({
	imports: [SequelizeModule.forFeature([Manga])],
	controllers: [MangasController],
	providers: [MangasService],
	exports: [MangasService],
})
export class MangasModule {}
