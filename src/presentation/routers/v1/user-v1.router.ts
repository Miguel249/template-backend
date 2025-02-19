import { CreateUserDTO } from '@Application/dtos/user/request/create-user.dto';
import { CONTROLLERS, MIDDLEWARES } from '@Config/inversify/inversify.symbol';
import type { CreateUserController } from '@Presentation/controllers/user/create-user.controller';
import type { ValidationMiddlewareFactory } from '@Presentation/middlewares/validation-middleware.factory';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class UserV1Router {
	private userRouter: Router = Router();
	constructor(
		@inject(CONTROLLERS.CreateUser) private readonly createUserController: CreateUserController,
		@inject(MIDDLEWARES.ValidationDto) private readonly validationMiddlewareFactory: ValidationMiddlewareFactory
	) {
		this.initUserRoutes();
	}

	private initUserRoutes(): void {
		const validationDto = this.validationMiddlewareFactory.create(CreateUserDTO);
		this.userRouter.post('/create-user', validationDto.run, this.createUserController.run);
	}

	public getUserRouter(): Router {
		return this.userRouter;
	}
}
