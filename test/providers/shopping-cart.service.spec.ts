import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
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
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';

const mockedUser = {
	username: 'John',
	email: 'jhon@gmail.com',
	password: 'John123',
};

describe('Shopping Cart Controller', () => {
	let app: INestApplication;
	let mangasService: MangasService;
	let usersService: UsersService;
	let shoppingCartService: ShoppingCartService;

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
		shoppingCartService = testModule.get<ShoppingCartService>(ShoppingCartService);
		app = testModule.createNestApplication();

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

	it('should return all cart items', async () => {
		const user = await usersService.findOne({ where: { username: mockedUser.username } });
		const cart = await shoppingCartService.findAll(user.id);

		cart.forEach((item) =>
			expect(item.dataValues).toEqual(
				expect.objectContaining({
					id: expect.any(Number),
					userId: user.id,
					mangaId: expect.any(Number),
					mangaName: expect.any(String),
					price: expect.any(Number),
					image: expect.any(String),
					amount: expect.any(Number),
					count: expect.any(Number),
					totalPrice: expect.any(Number),
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
				}),
			),
		);
	});

	it('should add cart items', async () => {
		await shoppingCartService.add({
			username: mockedUser.username,
			mangaId: 3,
		});

		const user = await usersService.findOne({
			where: { username: mockedUser.username },
		});

		const cart = await shoppingCartService.findAll(user.id);

		expect(cart.find((item) => item.mangaId === 3)).toEqual(
			expect.objectContaining({
				id: expect.any(Number),
				userId: user.id,
				mangaId: 3,
				mangaName: expect.any(String),
				price: expect.any(Number),
				image: expect.any(String),
				amount: expect.any(Number),
				count: expect.any(Number),
				totalPrice: expect.any(Number),
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			}),
		);
	});

	it('should return updated count', async () => {
		const result = await shoppingCartService.updateCount(2, 1);

		expect(result).toEqual({ count: 2 });
	});

	it('should return updated total price', async () => {
		const part = await mangasService.findOne(1);
		const result = await shoppingCartService.updateTotalPrice(part.price * 3, 1);

		expect(result).toEqual({ totalPrice: part.price * 3 });
	});

	it('should delete cart item', async () => {
		await shoppingCartService.remove(1);

		const user = await usersService.findOne({
			where: { username: mockedUser.username },
		});

		const cart = await shoppingCartService.findAll(user.id);

		expect(cart.find((item) => item.mangaId === 1)).toBeUndefined();
	});

	it('should delete all cart items', async () => {
		const user = await usersService.findOne({
			where: { username: mockedUser.username },
		});

		await shoppingCartService.removeAll(user.id);

		const cart = await shoppingCartService.findAll(user.id);

		expect(cart).toStrictEqual([]);
	});
});
