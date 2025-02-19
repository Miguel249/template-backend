import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
	@IsString({ message: 'El nombre es obligatorio' })
	@Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
	declare name: string;

	@IsEmail({}, { message: 'El correo no es válido' })
	declare email: string;

	@IsString({ message: 'La contraseña es obligatorio' })
	@Length(6, undefined, { message: 'La contraseña debe tener mínimo 6 caracteres' })
	declare password: string;
}
