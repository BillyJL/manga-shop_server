import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Manga } from './mangas.model';
import { IMangaQuery } from './types';
import Op from 'sequelize/types/operators';

@Injectable()
export class MangasService {
	constructor(@InjectModel(Manga) private mangaModel: typeof Manga) {}

	async paginateAndFilter(query: IMangaQuery): Promise<{ count: number; rows: Manga[] }> {
		const limit = +query.limit;
		const offset = +query.offset * 20;
		return this.mangaModel.findAndCountAll({
			limit,
			offset,
		});
	}

	async bestsellers(): Promise<{ count: number; rows: Manga[] }> {
		return this.mangaModel.findAndCountAll({
			where: { bestsellers: true },
		});
	}

	async new(): Promise<{ count: number; rows: Manga[] }> {
		return this.mangaModel.findAndCountAll({
			where: { new: true },
		});
	}

	async findOne(id: number): Promise<Manga> {
		return this.mangaModel.findOne({
			where: { id },
		});
	}

	async findOneByName(name: string): Promise<Manga> {
		return this.mangaModel.findOne({
			where: { name },
		});
	}

	async findOneByString(str: string): Promise<{ count: number; rows: Manga[] }> {
		return this.mangaModel.findAndCountAll({
			limit: 20,
			where: { name: { [Op.like]: `%${str}%` } },
		});
	}
}
