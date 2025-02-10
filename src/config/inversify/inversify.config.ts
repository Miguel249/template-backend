import { InversifyContainer } from '@Config/inversify/inversify.container';
import { CONFIG, FACTORIES, REPOSITORIES } from '@Config/inversify/inversify.symbol';
import { UserRepository } from '@Infrastructure/repositories/user.repository';
import { Database } from '@Config/database/database.config';
import { ServerConfig } from '@Config/server/server.config';
import { RepositoryFactory } from '@Infrastructure/factories/repository.factory';

const container = InversifyContainer.getInstance();

function bindConfig() {
  container.bind<Database>(CONFIG.Database).to(Database);
  container.bind<ServerConfig>(CONFIG.Server).to(ServerConfig);
}

function bindRepositories() {
  container.bind<UserRepository>(REPOSITORIES.UserRepository).to(UserRepository);
}

function bindFactories() {
  container.bind<RepositoryFactory>(FACTORIES.RepositoryFactory).to(RepositoryFactory);
}

bindConfig();
bindRepositories();
bindFactories();

export { container };

