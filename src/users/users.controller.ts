import {
	Controller,
	Post,
	Get,
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
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

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

	@Get('/login-check')
	@UseGuards(AuthenticatedGuard)
	loginCheck(@Request() req) {
		return req.user;
	}

	@Get('/logout')
	logout(@Request() req) {
		req.session.destroy();
		return { msg: 'Session ended' };
	}
}
