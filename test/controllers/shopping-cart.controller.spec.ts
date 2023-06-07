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
import { MangasService } from 'src/mangas/mangas.service';
import { UsersService } from 'src/users/users.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';

const mockedUser = {
	username: 'John',
	email: 'jhon@gmail.com',
	password: 'John123',
};

describe('Shopping Cart Controller', () => {
	let app: INestApplication;
	let mangasService: MangasService;
	let usersService: UsersService;

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
				ShoppingCartModule,
				MangasModule,
				AuthModule,
			],
		}).compile();

		mangasService = testModule.get<MangasService>(MangasService);
		usersService = testModule.get<UsersService>(UsersService);
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

	beforeEach(async () => {
		const cart = new ShoppingCart();
		const user = await usersService.findOne({ where: { username: mockedUser.username } });
		const manga = await mangasService.findOne(1);

		cart.userId = user.id;
		cart.mangaId = manga.id;
		cart.mangaName = manga.name;
		cart.price = manga.price;
		cart.image = JSON.parse(manga.images)[0];
		cart.amount = manga.amount;
		cart.totalPrice = manga.price;

		return cart.save();
	});

	afterEach(async () => {
		await User.destroy({ where: { username: mockedUser.username } });
		await ShoppingCart.destroy({ where: { mangaId: 1 } });
	});

	it('should get all cart items', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const user = await usersService.findOne({ where: { username: mockedUser.username } });
		const response = await request(app.getHttpServer())
			.get(`/shopping-cart/${user.id}`)
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					id: expect.any(Number),
					userId: user.id,
					mangaId: expect.any(Number),
					mangaName: expect.any(String),
					price: expect.any(Number),
					image: expect.any(String),
					amount: expect.any(Number),
					count: expect.any(Number),
					totalPrice: expect.any(Number),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				},
			]),
		);
	});

	it('should add cart item', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		await request(app.getHttpServer())
			.post(`/shopping-cart/add`)
			.send({ username: mockedUser.username, mangaId: 3 })
			.set('Cookie', login.headers['set-cookie']);

		const user = await usersService.findOne({ where: { username: mockedUser.username } });
		const response = await request(app.getHttpServer())
			.get(`/shopping-cart/${user.id}`)
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body.find((item) => item.mangaId === 3)).toMatchObject({
			id: expect.any(Number),
			userId: expect.any(Number),
			mangaId: 3,
			mangaName: expect.any(String),
			price: expect.any(Number),
			image: expect.any(String),
			amount: expect.any(Number),
			count: expect.any(Number),
			totalPrice: expect.any(Number),
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		});
	});

	it('should get updated count of cart item', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const response = await request(app.getHttpServer())
			.patch(`/shopping-cart/count/1`)
			.send({ count: 2 })
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body).toEqual({ count: 2 });
	});

	it('should get updated total price of cart item', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });
		const manga = await mangasService.findOne(1);
		const response = await request(app.getHttpServer())
			.patch(`/shopping-cart/total-price/1`)
			.send({ totalPrice: manga.price * 3 })
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body).toEqual({ totalPrice: manga.price * 3 });
	});

	it('should get delete cart item', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });

		await request(app.getHttpServer())
			.delete('/shopping-cart/one/1')
			.set('Cookie', login.headers['set-cookie']);

		const user = await usersService.findOne({
			where: { username: mockedUser.username },
		});

		const response = await request(app.getHttpServer())
			.get(`/shopping-cart/${user.id}`)
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body.find((item) => item.mangaId === 1)).toBeUndefined();
	});

	it('should delete all cart item', async () => {
		const login = await request(app.getHttpServer())
			.post('/users/login')
			.send({ username: mockedUser.username, password: mockedUser.password });

		const user = await usersService.findOne({
			where: { username: mockedUser.username },
		});

		await request(app.getHttpServer())
			.delete(`/shopping-cart/all/${user.id}`)
			.set('Cookie', login.headers['set-cookie']);

		const response = await request(app.getHttpServer())
			.get(`/shopping-cart/${user.id}`)
			.set('Cookie', login.headers['set-cookie']);

		expect(response.body).toStrictEqual([]);
	});
});
