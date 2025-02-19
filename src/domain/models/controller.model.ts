export abstract class Controller {
	public abstract run: (...args: any) => Promise<any>;
}
