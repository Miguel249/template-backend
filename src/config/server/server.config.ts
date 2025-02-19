import { ROUTES } from '@Config/inversify/inversify.symbol';
import type { AppV1Router } from '@Presentation/routers/v1/app-v1.router';
import { SystemEnvs } from '@Shared/infrastructure/environments/system-environments.config';
import cors from 'cors';
import express, { Router, type Application } from 'express';
import helmet from 'helmet';
import { inject, injectable } from 'inversify';
import morgan from 'morgan';

@injectable()
export class ServerConfig {
	private readonly app: Application;

	constructor(@inject(ROUTES.AppV1) private readonly appV1Router: AppV1Router) {
		this.app = express();
		this.initMiddelwares();
		this.initRoutes();
	}

	private initMiddelwares = (): void => {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(morgan(':method :url :status - :response-time ms'));
	};

	private initRoutes = (): void => {
		const mainRouter = Router();
		mainRouter.use('/api/v1', this.appV1Router.getRouter());
		this.app.use(mainRouter);
	};

	public initServer = (): void => {
		this.app.listen(SystemEnvs.REST_PORT, () => {
			console.log(`Listening on port ${SystemEnvs.REST_PORT} 🐐`);
		});
	};
}
