export abstract class Controller {
	protected abstract run(...args: any): Promise<any>;
}
