import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from 'src/users/users.service';
import { MangasService } from 'src/mangas/mangas.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
	constructor(
		@InjectModel(ShoppingCart) private shoppingCart: typeof ShoppingCart,
		private readonly userService: UsersService,
		private readonly mangaService: MangasService,
	) {}

	async findAll(userId: number | string): Promise<ShoppingCart[]> {
		return this.shoppingCart.findAll({ where: { userId } });
	}

	async add(addToCartDto: AddToCartDto): Promise<ShoppingCart> {
		const cart = new ShoppingCart();
		const user = await this.userService.findOne({ where: { username: addToCartDto.username } });
		const manga = await this.mangaService.findOne(addToCartDto.mangaId);

		cart.userId = user.id;
		cart.mangaId = manga.id;
		cart.mangaName = manga.name;
		cart.price = manga.price;
		cart.image = JSON.stringify(manga.images)[0];
		cart.amount = manga.amount;
		cart.totalPrice = manga.price;

		return cart.save();
	}

	async updateCount(count: number, mangaId: number): Promise<{ count: number }> {
		await this.shoppingCart.update({ count }, { where: { mangaId } });

		const manga = await this.shoppingCart.findOne({ where: { mangaId } });
		return { count: manga.count };
	}

	async updateTotalPrice(totalPrice: number, mangaId: number): Promise<{ totalPrice: number }> {
		await this.shoppingCart.update({ totalPrice }, { where: { mangaId } });
		const manga = await this.shoppingCart.findOne({ where: { mangaId } });
		return { totalPrice: manga.totalPrice };
	}

	async remove(mangaId: number): Promise<void> {
		const manga = await this.shoppingCart.findOne({ where: { mangaId } });

		await manga.destroy();
	}

	async removeAll(userId: number): Promise<void> {
		await this.shoppingCart.destroy({ where: { userId } });
	}
}
