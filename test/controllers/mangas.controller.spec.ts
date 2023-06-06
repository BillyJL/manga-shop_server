import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { MangasModule } from 'src/mangas/mangas.module';

const mockedUser = {
	username: 'John',
	email: 'jhon@gmail.com',
	password: 'John123',
};

describe('Mangas Controller', () => {
	let app: INestApplication;

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
				AuthModule,
			],
		}).compile();

		app = testModule.createNestApplication();
		app.use(
			session({
				secret: 'keyword',
				resave: false,
				saveUninitialized: false,
			}),
		);
		app.use(passport.initialize());
		app.use(passport.session());

		await app.init();
	});

	beforeEach(async () => {
		const user = new User();

		const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

		user.username = mockedUser.username;
		user.password = hashedPassword;
		user.email = mockedUser.email;

		return user.save();
	});

	afterEach(async () => {
		await User.destroy({ where: { username: mockedUser.username } });
	});

	it('should get one manga', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const response = await request(app.getHttpServer())
			.get('/mangas/find/1')
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body).toMatchObject({
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
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		});
	});

	it('should get bestsellers', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const response = await request(app.getHttpServer())
			.get('/mangas/bestsellers')
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body.rows).toEqual(
			expect.arrayContaining([
				{
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
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			]),
		);
	});

	it('should get new', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const response = await request(app.getHttpServer())
			.get('/mangas/new')
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body.rows).toEqual(
			expect.arrayContaining([
				{
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
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			]),
		);
	});

	it('should search by string', async () => {
		const body = { search: 'mos' };
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const response = await request(app.getHttpServer())
			.post('/mangas/search')
			.send(body)
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body.rows.length).toBeLessThanOrEqual(20);
		response.body.rows.forEach((element) => {
			expect(element.name.toLowerCase()).toContain(body.search);
		});
		expect(response.body.rows).toEqual(
			expect.arrayContaining([
				{
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
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			]),
		);
	});

	it('should get by name', async () => {
		const body = { name: 'Cum omnis.' };
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const response = await request(app.getHttpServer())
			.post('/mangas/name')
			.send(body)
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body).toMatchObject({
			id: expect.any(Number),
			name: body.name,
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
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		});
	});
});
