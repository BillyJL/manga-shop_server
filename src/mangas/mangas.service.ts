import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Manga } from './mangas.model';
import { IMangaQuery } from './types';

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
}
