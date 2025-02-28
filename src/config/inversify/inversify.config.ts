import { CreateUserUseCase } from '@Application/use-cases/user/create-user.usecase';
import { InversifyContainer } from '@Config/inversify/inversify.container';
import { CONFIG, CONTROLLERS, MIDDLEWARES, REPOSITORIES, ROUTES, USECASES } from '@Config/inversify/inversify.symbol';
import { ServerConfig } from '@Config/server/server.config';
import { HttpResponse } from '@Domain/models/http-response.model';
import { ErrorHandler } from '@Infrastructure/handlers/error.handler';
import { TransactionalRepository } from '@Infrastructure/repositories/transactional.repository';
import { UserRepository } from '@Infrastructure/repositories/user.repository';
import { CreateUserController } from '@Presentation/controllers/user/create-user.controller';
import { AuthorizationMiddleware } from '@Presentation/middlewares/authentication.middleware';
import { ValidationDtoMiddleware } from '@Presentation/middlewares/validation-dto.middleware';
import { AppV1Router } from '@Presentation/routers/v1/app-v1.router';
import { UserV1Router } from '@Presentation/routers/v1/user-v1.router';
import type { Container } from 'inversify';
import { bindDatabaseModule } from './modules/database.module';
import { DatabaseEnv } from '@Shared/infrastructure/environments/database-environments.config';

export class ContainerLoader {
	private static _container: Container;

	public static init(): Container {
		if (!ContainerLoader._container) {
			ContainerLoader._container = InversifyContainer.getInstance();
			ContainerLoader.bindDependencies();
		}
		return ContainerLoader._container;
	}

	private static bindDependencies() {
		bindDatabaseModule(ContainerLoader._container, DatabaseEnv.DB_DIALECT);
		ContainerLoader.bindConfig();
		ContainerLoader.bindRepositories();
		ContainerLoader.bindUseCases();
		ContainerLoader.bindMiddleware();
		ContainerLoader.bindControllers();
		ContainerLoader.bindRouters();
	}

	private static bindConfig() {
		ContainerLoader._container.bind<ServerConfig>(CONFIG.Server).to(ServerConfig);
		ContainerLoader._container.bind<ErrorHandler>(CONFIG.ErrorHandler).to(ErrorHandler);
		ContainerLoader._container.bind<HttpResponse<any>>(CONFIG.HttpResponse).to(HttpResponse<any>);
	}

	private static bindRepositories() {
		ContainerLoader._container.bind<UserRepository>(REPOSITORIES.UserRepository).to(UserRepository);
		ContainerLoader._container
			.bind<TransactionalRepository>(REPOSITORIES.TransactionalRepository)
			.to(TransactionalRepository);
	}

	private static bindUseCases() {
		ContainerLoader._container.bind<CreateUserUseCase>(USECASES.CreateUser).to(CreateUserUseCase);
	}

	private static bindMiddleware() {
		ContainerLoader._container.bind<ValidationDtoMiddleware>(MIDDLEWARES.ValidationDto).to(ValidationDtoMiddleware);
		ContainerLoader._container.bind<AuthorizationMiddleware>(MIDDLEWARES.Authorization).to(AuthorizationMiddleware);
	}

	private static bindControllers() {
		ContainerLoader._container.bind<CreateUserController>(CONTROLLERS.CreateUser).to(CreateUserController);
	}

	private static bindRouters() {
		ContainerLoader._container.bind<AppV1Router>(ROUTES.AppV1).to(AppV1Router);
		ContainerLoader._container.bind<UserV1Router>(ROUTES.UserV1).to(UserV1Router);
	}
}
