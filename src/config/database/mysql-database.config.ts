import { DataSource } from 'typeorm';
import { DatabaseEnv } from '@Shared/infrastructure/environments/database-environments.config';
import { injectable } from 'inversify';

@injectable()
export class MySQLDatabase {
	private readonly dataSource: DataSource;

	constructor() {
		this.dataSource = new DataSource({
			type: DatabaseEnv.DB_DIALECT as any,
			host: DatabaseEnv.DB_HOST,
			port: DatabaseEnv.DB_PORT,
			username: DatabaseEnv.DB_USER,
			password: DatabaseEnv.DB_PASS,
			database: DatabaseEnv.DB_NAME,
			synchronize: true, //DO NOT USE IN PRODUCTION
			logging: false,
			entities: [`${__dirname}/../../infrastructure/entities/*{.ts,.js}`],
			migrations: [],
			subscribers: [],
			driver: require('mysql2')
		});
	}

	public async connect(): Promise<void> {
		try {
			await this.dataSource.initialize();
			console.log('✅MySQL Database connected successfully. 🐐');
		} catch (error) {
			console.error('❌ Database connection failed: ', error);
			process.exit(1);
		}
	}

	public getDataSource(): DataSource {
		return this.dataSource;
	}
}
