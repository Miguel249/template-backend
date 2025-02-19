import type { AuthenticationTokenData } from './authentication-token-data.model';

export abstract class UseCase<T, U> {
	protected abstract run(arg: T): Promise<U>;
}

export interface UseCaseContext {
	authentication_data: AuthenticationTokenData;
}
