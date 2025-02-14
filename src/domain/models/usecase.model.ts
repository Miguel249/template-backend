export abstract class UseCase<T, U> {
	protected abstract run(arg: T): Promise<U>;
}
