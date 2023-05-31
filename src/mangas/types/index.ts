import { ApiProperty } from '@nestjs/swagger';

class Manga {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty({ example: 'Cool name' })
	name: string;

	@ApiProperty({ example: 270 })
	price: number;

	@ApiProperty({ example: 'Cool Author' })
	author: string;

	@ApiProperty({ example: 'Cool Publisher' })
	publisher: string;

	@ApiProperty({ example: 'Soft cover' })
	binding_type: string;

	@ApiProperty({ example: 2022 })
	publication_year: number;

	@ApiProperty({ example: 262 })
	pages: number;

	@ApiProperty({ example: '15.2x20.8 cm' })
	size: string;

	@ApiProperty({ example: 'Ukrainian' })
	language: string;

	@ApiProperty({
		example:
			'The alchemy of mistakes is unforgiving. The Elric brothers have already learned this, but they have nothing to lose. The life of one of them is no longer a life. The other lives only with the dream of returning himself and his brother to what has already been, to what is no longer there.',
	})
	description: string;

	@ApiProperty({
		example:
			'["https://cosmic.com.ua/content/images/41/777x1080l80br0/stalevyi_alkhimik_tom_2-67908382704687.webp"]',
	})
	images: string;

	@ApiProperty({ example: 3 })
	amount: number;

	@ApiProperty({ example: false })
	bestsellers: boolean;

	@ApiProperty({ example: true })
	new: boolean;

	@ApiProperty({ example: '2023-05-26T09:02:59.000Z' })
	createdAt: string;

	@ApiProperty({ example: '2023-05-26T09:02:59.000Z' })
	updatedAt: string;
}
export class PaginateAndFilterResponse {
	@ApiProperty({ example: 10 })
	count: number;

	@ApiProperty({ example: Manga, isArray: true })
	rows: Manga;
}

class Bestseller extends Manga {
	@ApiProperty({ example: true })
	bestsellers: boolean;
}
export class GetBestsellersResponse extends PaginateAndFilterResponse {
	@ApiProperty({ example: 10 })
	count: number;

	@ApiProperty({ example: Manga, isArray: true })
	rows: Bestseller;
}

class NewManga extends Manga {
	@ApiProperty({ example: true })
	new: boolean;
}
export class GetNewResponse extends PaginateAndFilterResponse {
	@ApiProperty({ example: Manga, isArray: true })
	rows: NewManga;
}

export class SearchResponse extends PaginateAndFilterResponse {}
export class SearchRequest {
	@ApiProperty({ example: 'l' })
	search: string;
}

export class GetByNameResponse extends Manga {}
export class GetByNameRequest {
	@ApiProperty({ example: 'Cool Name' })
	name: string;
}

export class FindOneResponse extends Manga {}

export interface IMangaQuery {
	limit: string;
	offset: string;
}
