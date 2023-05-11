import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'CoolName' })
	@IsNotEmpty()
	readonly username: string;

	@ApiProperty({ example: 'cool_password' })
	@IsNotEmpty()
	readonly password: string;

	@ApiProperty({ example: 'cool@email.com' })
	@IsNotEmpty()
	readonly email: string;
}
