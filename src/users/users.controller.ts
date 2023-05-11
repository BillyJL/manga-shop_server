import {
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	Header,
	Body,
	Request,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Post('/signup')
	@HttpCode(HttpStatus.CREATED)
	@Header('Content-type', 'application/json')
	createUser(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Post('/login')
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	login(@Request() req) {
		return { user: req.user, msg: 'Logged in' };
	}
}
