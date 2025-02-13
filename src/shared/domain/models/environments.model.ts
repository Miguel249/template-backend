export abstract class ISystemEnv {
	abstract NODE_ENV: string;
	abstract REST_PORT: number;
	abstract SECRET_KEY: string;
	abstract SECRET_KEY_TOKEN: string;
}

export abstract class IDatabaseEnv {
	abstract DB_DIALECT: string;
	abstract DB_USER: string;
	abstract DB_PASS: string;
	abstract DB_HOST: string;
	abstract DB_PORT: number;
	abstract DB_NAME: string;
}
