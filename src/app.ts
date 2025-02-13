import 'dotenv/config';
import type { ServerConfig } from '@Config/server/server.config';
import type { Database } from '@Config/database/database.config';
import { container } from '@Config/inversify/inversify.config';
import { CONFIG } from '@Config/inversify/inversify.symbol';

const main = async () => {
	container.get<ServerConfig>(CONFIG.Server).initServer();
	const postgresDB = container.get<Database>(CONFIG.Database);
	await postgresDB.connect();
};

main().then();
