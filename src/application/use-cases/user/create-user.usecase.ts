import type { CreateUserDTO } from '@Application/dtos/user/create-user.dto';
import { REPOSITORIES } from '@Config/inversify/inversify.symbol';
import { UseCase } from '@Domain/models/usecase.model';
import type { User } from '@Infrastructure/entities/user';
import type { UserRepository } from '@Infrastructure/repositories/user.repository';
import { inject } from 'inversify';

export class CreateUserUseCase extends UseCase<CreateUserDTO, User> {
	constructor(@inject(REPOSITORIES.UserRepository) private userRepo: UserRepository) {
		super();
	}

	public run(arg: CreateUserDTO): Promise<User> {
		throw new Error('Method not implemented.');
	}
}
