export class ErrorException extends Error {
	public internalCode: number;

	constructor(_internalCode: number, message: string) {
		super(message);
		this.internalCode = _internalCode;
	}
}
