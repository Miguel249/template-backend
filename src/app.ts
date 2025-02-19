import 'dotenv/config';
import type { ServerConfig } from '@Config/server/server.config';
import type { Database } from '@Config/database/database.config';
import { CONFIG } from '@Config/inversify/inversify.symbol';
import { ContainerLoader } from '@Config/inversify/inversify.config';

const main = async () => {
	const container = ContainerLoader.init();
	const postgresDB = container.get<Database>(CONFIG.Database);
	await postgresDB.connect();
	container.get<ServerConfig>(CONFIG.Server).initServer();
};

main().then();
