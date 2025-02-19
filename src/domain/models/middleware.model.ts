export abstract class MiddlewareBase {
	public abstract run: (...args: any[]) => Promise<unknown>;
}

export abstract class MiddlewareFunctionBase<T> {
	public abstract run: (arg: T) => Promise<unknown> | unknown;
}
