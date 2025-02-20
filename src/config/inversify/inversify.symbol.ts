export const USECASES = {
	CreateUser: Symbol.for('CreateUserUseCase')
};

export const CONTROLLERS = {
	CreateUser: Symbol.for('CreateUserController')
};

export const MIDDLEWARES = {
	ValidationDto: Symbol.for('ValidationDtoMiddleware')
};

export const SERVICES = {
	// ExampleService: Symbol.for("ExampleService"),
};

export const REPOSITORIES = {
	UserRepository: Symbol.for('UserRepository'),
	TransactionalRepository: Symbol.for('TransactionalRepository')
};

export const CONFIG = {
	Database: Symbol.for('Database'),
	Server: Symbol.for('Server'),
	HttpResponse: Symbol.for('HttpResponse'),
	ErrorHandler: Symbol.for('ErrorHandler')
};

export const ENVIRONMENTS = {};

export const ROUTES = {
	AppV1: Symbol.for('AppV1Router'),
	UserV1: Symbol.for('UserV1Router')
};
