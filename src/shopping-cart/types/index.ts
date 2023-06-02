import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
	@ApiProperty({ example: 2 })
	id: number;

	@ApiProperty({ example: 'Cool Name' })
	mangaName: string;

	@ApiProperty({ example: 200 })
	price: number;

	@ApiProperty({
		example: 'https://loremflickr.com/640/480/technics?random=849581742306099411950399951214',
	})
	image: string;

	@ApiProperty({ example: 5 })
	amount: number;

	@ApiProperty({ example: 3 })
	userId: number;

	@ApiProperty({ example: 6 })
	mangaId: number;

	@ApiProperty({ example: 2 })
	count: number;

	@ApiProperty({ example: 400 })
	totalPrice: number;

	@ApiProperty({ example: '2023-06-02T08:59:07.977Z' })
	updatedAt: string;

	@ApiProperty({ example: '2023-06-02T08:59:07.977Z' })
	createdAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}
export class AddToCardResponse extends ShoppingCartItem {}
export class UpdateCountResponse {
	@ApiProperty({ example: 1 })
	count: number;
}
export class UpdateCountRequest {
	@ApiProperty({ example: 1 })
	count: number;
}
export class TotalPriceResponse {
	@ApiProperty({ example: 1000 })
	total_price: number;
}
export class TotalPriceRequest {
	@ApiProperty({ example: 1000 })
	total_price: number;
}
