import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MangasService } from './mangas.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('mangas')
export class MangasController {
	constructor(private readonly mangasService: MangasService) {}

	@UseGuards(AuthenticatedGuard)
	@Get()
	paginateAndFilter(@Query() query) {
		return this.mangasService.paginateAndFilter(query);
	}

	@UseGuards(AuthenticatedGuard)
	@Get('find/:id')
	getOne(@Param('id') id: string) {
		return this.mangasService.findOne(id);
	}

	@UseGuards(AuthenticatedGuard)
	@Get('bestsellers')
	getBestsellers() {
		return this.mangasService.bestsellers();
	}

	@UseGuards(AuthenticatedGuard)
	@Get('new')
	getNew() {
		return this.mangasService.new();
	}

	@UseGuards(AuthenticatedGuard)
	@Post('search')
	search(@Body() { search }: { search: string }) {
		return this.mangasService.searchByString(search);
	}

	@UseGuards(AuthenticatedGuard)
	@Post('name')
	getByName(@Body() { name }: { name: string }) {
		return this.mangasService.findOneByName(name);
	}
}
