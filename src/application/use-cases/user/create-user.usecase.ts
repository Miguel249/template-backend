import { UserBuilder } from '@Application/dtos/user/builder/user.builder';
import type { CreateUserDTO } from '@Application/dtos/user/request/create-user.dto';
import { REPOSITORIES } from '@Config/inversify/inversify.symbol';
import { ErrorException } from '@Domain/exceptions/error.exception';
import { UseCase } from '@Domain/models/usecase.model';
import type { User } from '@Infrastructure/entities/user';
import type { TransactionalRepository } from '@Infrastructure/repositories/transactional.repository';
import type { UserRepository } from '@Infrastructure/repositories/user.repository';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateUserUseCase extends UseCase<CreateUserDTO, User> {
	constructor(
		@inject(REPOSITORIES.UserRepository) private readonly userRepo: UserRepository,
		@inject(REPOSITORIES.TransactionalRepository) private readonly transactionalRepo: TransactionalRepository
	) {
		super();
	}

	public run(args: CreateUserDTO): Promise<User> {
		return this.transactionalRepo.execute(async transaction => {
			const [userExist] = await this.userRepo.findBy({ email: args.email });
			if (userExist) {
				throw new ErrorException(1101, 'El usuario ya esta registrado');
			}
			const userBuild = await new UserBuilder().setName(args.name).setEmail(args.email).setPassword(args.password);
			return await this.userRepo.save(userBuild.build(), transaction);
		});
	}
}
