import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MangasService } from './mangas.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
	FindOneResponse,
	GetBestsellersResponse,
	GetByNameRequest,
	GetByNameResponse,
	GetNewResponse,
	PaginateAndFilterResponse,
	SearchRequest,
	SearchResponse,
} from './types';

@Controller('mangas')
export class MangasController {
	constructor(private readonly mangasService: MangasService) {}

	@ApiOkResponse({ type: PaginateAndFilterResponse })
	@UseGuards(AuthenticatedGuard)
	@Get()
	paginateAndFilter(@Query() query) {
		return this.mangasService.paginateAndFilter(query);
	}

	@ApiOkResponse({ type: FindOneResponse })
	@UseGuards(AuthenticatedGuard)
	@Get('find/:id')
	getOne(@Param('id') id: string) {
		return this.mangasService.findOne(id);
	}

	@ApiOkResponse({ type: GetBestsellersResponse })
	@UseGuards(AuthenticatedGuard)
	@Get('bestsellers')
	getBestsellers() {
		return this.mangasService.bestsellers();
	}

	@ApiOkResponse({ type: GetNewResponse })
	@UseGuards(AuthenticatedGuard)
	@Get('new')
	getNew() {
		return this.mangasService.new();
	}

	@ApiOkResponse({ type: SearchResponse })
	@ApiBody({ type: SearchRequest })
	@UseGuards(AuthenticatedGuard)
	@Post('search')
	search(@Body() { search }: { search: string }) {
		return this.mangasService.searchByString(search);
	}

	@ApiOkResponse({ type: GetByNameResponse })
	@ApiBody({ type: GetByNameRequest })
	@UseGuards(AuthenticatedGuard)
	@Post('name')
	getByName(@Body() { name }: { name: string }) {
		return this.mangasService.findOneByName(name);
	}
}
