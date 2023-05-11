import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
	@ApiProperty({ example: 'CoolName' })
	username: string;

	@ApiProperty({ example: 'cool_password' })
	password: string;
}

export class LoginUserResponse {
	@ApiProperty({
		example: {
			user: {
				userId: 1,
				username: 'CoolName',
				password: 'cool_password',
			},
		},
	})
	user: {
		userId: number;
		username: string;
		password: string;
	};

	@ApiProperty({ example: 'Logged in' })
	msg: string;
}

export class LogoutUserResponse {
	@ApiProperty({ example: 'Session has ended' })
	msg: string;
}

export class LoginCheckResponse {
	@ApiProperty({ example: 1 })
	userId: number;

	@ApiProperty({ example: 'CoolName' })
	username: string;

	@ApiProperty({ example: 'cool@email.com' })
	email: string;
}

export class SignupResponse {
	@ApiProperty({ example: 1 })
	userId: number;

	@ApiProperty({ example: 'CoolName' })
	username: string;

	@ApiProperty({ example: '$2b$10$FmonZHX1faotwnU.GEmiK.kdCKrye/lMdFXJtypKUyTyk6J.oczYi' })
	password: string;

	@ApiProperty({ example: 'cool@email.com' })
	email: string;

	@ApiProperty({ example: '2023-05-11T15:26:08.163Z' })
	updatedAt: string;

	@ApiProperty({ example: '2023-05-11T15:26:08.163Z' })
	createdAt: string;
}
