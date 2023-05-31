import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from 'src/users/users.service';
import { MangasService } from 'src/mangas/mangas.service';

@Injectable()
export class ShoppingCartService {
	constructor(
		@InjectModel(ShoppingCart) private shoppingCart: typeof ShoppingCart,
		private readonly userService: UsersService,
		private readonly mangaService: MangasService,
	) {}
}
