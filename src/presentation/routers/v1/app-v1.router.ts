import { ROUTES } from '@Config/inversify/inversify.symbol';
import { Router } from 'express';
import type { UserV1Router } from './user-v1.router';
import { inject, injectable } from 'inversify';

@injectable()
export class AppV1Router {
	private appRouter: Router = Router();

	constructor(@inject(ROUTES.UserV1) private readonly userV1Routes: UserV1Router) {
		this.appRouter.use('/user', this.userV1Routes.getUserRouter());
	}

	public getRouter(): Router {
		return this.appRouter;
	}
}
