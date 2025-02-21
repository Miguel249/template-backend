import { CreateUserDTO } from '@Application/dtos/user/request/create-user.dto';
import { CONTROLLERS, MIDDLEWARES } from '@Config/inversify/inversify.symbol';
import type { CreateUserController } from '@Presentation/controllers/user/create-user.controller';
import type { ValidationDtoMiddleware } from '@Presentation/middlewares/validation-dto.middleware';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class UserV1Router {
	private userRouter: Router = Router();
	constructor(
		@inject(CONTROLLERS.CreateUser) private readonly createUserController: CreateUserController,
		@inject(MIDDLEWARES.ValidationDto) private readonly validationDto: ValidationDtoMiddleware
	) {
		this.initUserRoutes();
	}

	private initUserRoutes(): void {
		this.userRouter.post(
			'/create-user',
			[this.validationDto.run(CreateUserDTO, 'Hubo errores de validación al crear usuario')] as any,
			this.createUserController.run
		);
	}

	public getUserRouter(): Router {
		return this.userRouter;
	}
}
