import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'CoolName' })
	@IsNotEmpty()
	@MinLength(5)
	readonly username: string;

	@ApiProperty({ example: 'cool_password' })
	@IsNotEmpty()
	@MinLength(8)
	readonly password: string;

	@ApiProperty({ example: 'cool@email.com' })
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;
}
