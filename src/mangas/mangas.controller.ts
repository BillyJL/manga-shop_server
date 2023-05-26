import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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
	@Get('New')
	getNew() {
		return this.mangasService.new();
	}
}
