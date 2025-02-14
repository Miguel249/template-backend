import { InversifyContainer } from '@Config/inversify/inversify.container';
import { CONFIG, REPOSITORIES } from '@Config/inversify/inversify.symbol';
import { UserRepository } from '@Infrastructure/repositories/user.repository';
import { Database } from '@Config/database/database.config';
import { ServerConfig } from '@Config/server/server.config';

const container = InversifyContainer.getInstance();

function bindConfig() {
	container.bind<Database>(CONFIG.Database).to(Database);
	container.bind<ServerConfig>(CONFIG.Server).to(ServerConfig);
}

function bindRepositories() {
	container.bind<UserRepository>(REPOSITORIES.UserRepository).to(UserRepository);
}

bindConfig();
bindRepositories();

export { container };
