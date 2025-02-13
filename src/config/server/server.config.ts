import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { SystemEnvs } from '@Shared/infrastructure/environments/system-environments.config';
import { injectable } from 'inversify';

@injectable()
export class ServerConfig {
	private readonly app: Application;

	constructor() {
		this.app = express();
		this.initMiddelwares();
	}

	private initMiddelwares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(morgan(':method :url :status - :response-time ms'));
	}

	public initServer(): void {
		this.app.get('/index', (_req, res) => {
			res.json('Hola mundo');
		});
		this.app.listen(SystemEnvs.REST_PORT, () => {
			console.log(`Listening on port ${SystemEnvs.REST_PORT} 🐐`);
		});
	}
}
