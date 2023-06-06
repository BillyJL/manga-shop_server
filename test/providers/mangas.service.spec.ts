import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { MangasModule } from 'src/mangas/mangas.module';
import { MangasService } from 'src/mangas/mangas.service';

describe('Mangas Service', () => {
	let app: INestApplication;
	let mangasService: MangasService;

	beforeEach(async () => {
		const testModule: TestingModule = await Test.createTestingModule({
			imports: [
				SequelizeModule.forRootAsync({
					imports: [ConfigModule],
					useClass: SequelizeConfigService,
				}),
				ConfigModule.forRoot({
					load: [databaseConfig],
				}),
				MangasModule,
			],
		}).compile();

		mangasService = testModule.get<MangasService>(MangasService);
		app = testModule.createNestApplication();

		await app.init();
	});

	it('should find manga by id', async () => {
		const manga = await mangasService.findOne(1);

		expect(manga.dataValues).toMatchObject({
			id: 1,
			name: expect.any(String),
			price: expect.any(Number),
			author: expect.any(String),
			publisher: expect.any(String),
			binding_type: expect.any(String),
			publication_year: expect.any(Number),
			pages: expect.any(Number),
			size: expect.any(String),
			language: expect.any(String),
			description: expect.any(String),
			images: expect.any(String),
			amount: expect.any(Number),
			bestsellers: expect.any(Boolean),
			new: expect.any(Boolean),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	it('should find manga by name', async () => {
		const manga = await mangasService.findOneByName('Veniam laboriosam.');

		expect(manga.dataValues).toMatchObject({
			id: expect.any(Number),
			name: manga.name,
			price: expect.any(Number),
			author: expect.any(String),
			publisher: expect.any(String),
			binding_type: expect.any(String),
			publication_year: expect.any(Number),
			pages: expect.any(Number),
			size: expect.any(String),
			language: expect.any(String),
			description: expect.any(String),
			images: expect.any(String),
			amount: expect.any(Number),
			bestsellers: expect.any(Boolean),
			new: expect.any(Boolean),
			createdAt: expect.any(Date),
			updatedAt: expect.any(Date),
		});
	});

	it('should find manga by search string', async () => {
		const mangas = await mangasService.searchByString('mos');

		expect(mangas.rows.length).toBeLessThanOrEqual(20);
		mangas.rows.forEach((element) => {
			expect(element.name.toLowerCase()).toContain('mos');
			expect(element.dataValues).toEqual(
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
					price: expect.any(Number),
					author: expect.any(String),
					publisher: expect.any(String),
					binding_type: expect.any(String),
					publication_year: expect.any(Number),
					pages: expect.any(Number),
					size: expect.any(String),
					language: expect.any(String),
					description: expect.any(String),
					images: expect.any(String),
					amount: expect.any(Number),
					bestsellers: expect.any(Boolean),
					new: expect.any(Boolean),
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
				}),
			);
		});
	});

	it('should find bestsellers', async () => {
		const mangas = await mangasService.bestsellers();

		mangas.rows.forEach((element) => {
			expect(element.dataValues).toEqual(
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
					price: expect.any(Number),
					author: expect.any(String),
					publisher: expect.any(String),
					binding_type: expect.any(String),
					publication_year: expect.any(Number),
					pages: expect.any(Number),
					size: expect.any(String),
					language: expect.any(String),
					description: expect.any(String),
					images: expect.any(String),
					amount: expect.any(Number),
					bestsellers: true,
					new: expect.any(Boolean),
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
				}),
			);
		});
	});

	it('should find new', async () => {
		const mangas = await mangasService.new();

		mangas.rows.forEach((element) => {
			expect(element.dataValues).toEqual(
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
					price: expect.any(Number),
					author: expect.any(String),
					publisher: expect.any(String),
					binding_type: expect.any(String),
					publication_year: expect.any(Number),
					pages: expect.any(Number),
					size: expect.any(String),
					language: expect.any(String),
					description: expect.any(String),
					images: expect.any(String),
					amount: expect.any(Number),
					bestsellers: expect.any(Boolean),
					new: true,
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
				}),
			);
		});
	});
});
