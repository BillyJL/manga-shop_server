import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService) {}

	async validateUser(username: string, password: string) {
		const user = await this.userService.findOne({ where: { username } });
		if (!user) {
			throw new UnauthorizedException('Invalid credential');
		}

		const passwordValid = await bcrypt.compare(password, user.password);
		if (!passwordValid) {
			throw new UnauthorizedException('Invalid credential');
		}

		return {
			useId: user.id,
			userName: user.username,
			email: user.email,
		};
	}
}
