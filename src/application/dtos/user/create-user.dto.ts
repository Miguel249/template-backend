import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
	@IsEmail()
	declare email: string;

	@IsString()
	@Length(6)
	declare password: string;
}
