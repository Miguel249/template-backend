import type { Container } from 'inversify';
import { CONFIG } from '../inversify.symbol';

export const bindDatabaseModule = (container: Container, dbType: string) => {
	let DatabaseClass: any;

	if (dbType === 'postgres') {
		DatabaseClass = require('@Config/database/postgres-database.config').PostgresDatabase;
	} else if (dbType === 'mysql') {
		DatabaseClass = require('@Config/database/mysql-database.config').MySQLDatabase;
	} else {
		throw new Error(`Base de datos "${dbType}" no soportada.`);
	}

	container.bind(CONFIG.Database).to(DatabaseClass);
};
