import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
	constructor(private readonly shoppingCartService: ShoppingCartService) {}

	@UseGuards(AuthenticatedGuard)
	@Get(':id')
	getAll(@Param('id') userId: string) {
		return this.shoppingCartService.findAll(+userId);
	}

	@UseGuards(AuthenticatedGuard)
	@Post('/add')
	addToCart(@Body() addToCartDto: AddToCartDto) {
		return this.shoppingCartService.add(addToCartDto);
	}

	@UseGuards(AuthenticatedGuard)
	@Patch('/count/:id')
	updateCount(@Body() { count }: { count: number }, @Param('id') mangaId: string) {
		return this.shoppingCartService.updateCount(count, +mangaId);
	}

	@UseGuards(AuthenticatedGuard)
	@Patch('/total-price/:id')
	updateTotalPrice(@Body() { totalPrice }: { totalPrice: number }, @Param('id') mangaId: string) {
		return this.shoppingCartService.updateTotalPrice(totalPrice, +mangaId);
	}

	@UseGuards(AuthenticatedGuard)
	@Delete('/one/:id')
	removeOne(@Param('id') mangaId: string) {
		return this.shoppingCartService.remove(+mangaId);
	}

	@UseGuards(AuthenticatedGuard)
	@Delete('/all/:id')
	removeAll(@Param('id') userId: string) {
		return this.shoppingCartService.removeAll(+userId);
	}
}
