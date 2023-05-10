import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
	) {}

	findOne(filter: { where: { id?: string; username?: string; email?: string } }): Promise<User> {
		return this.userModel.findOne({ ...filter });
	}

	async create(createUserDto: CreateUserDto): Promise<User | { warningMessage: string }> {
		const user = new User();
		const existingByUsername = await this.findOne({
			where: { username: createUserDto.username },
		});
		const existingByEmail = await this.findOne({
			where: { email: createUserDto.email },
		});

		if (existingByUsername) {
			return { warningMessage: 'A user with this name already exists' };
		} else if (existingByEmail) {
			return { warningMessage: 'A user with this email already exists' };
		}
	}
}
