export type {};

interface SystemEnv {
	NODE_ENV: 'development' | 'production' | 'test';
	REST_PORT: number;
	SECRET_KEY: string;
	SECRET_KEY_TOKEN: string;
	ENCRYPTION_SECRET: string;
}

interface DatabaseEnv {
	DB_DIALECT: string;
	DB_USER: string;
	DB_PASS: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_NAME: string;
	DATABASE_LOGS: string;
}

interface AuthenticationStrategiesEnv {
	GOOGLE_CLIENT_ID: string;
}

interface AwsEnv {
	AWS_REGION: string;
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	AWS_BUCKET_NAME: string;
}

declare global {
	type Nullable<T> = T | null;

	export namespace Express {
		export interface Request {
			authentication_data: {
				id: string;
				ip_connection: string;
			};
		}
	}
}
