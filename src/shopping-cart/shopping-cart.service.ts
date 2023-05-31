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

	async add(addToCartDto: AddToCartDto) {
		const cart = new ShoppingCart();
		const user = await this.userService.findOne({ where: { username: addToCartDto.username } });
		const manga = await this.mangaService.findOne(addToCartDto.mangaId);

		cart.userId = user.id;
		cart.mangaId = manga.id;
		cart.mangaName = manga.name;
		cart.price = manga.price;
		cart.image = JSON.stringify(manga.images)[0];
		cart.amount = manga.amount;
		cart.total_price = manga.price;

		return cart.save();
	}

	
}
