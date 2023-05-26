import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
}
