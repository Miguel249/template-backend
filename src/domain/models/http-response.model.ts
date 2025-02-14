import { injectable } from 'inversify';

export interface IHttpResponse<T> {
	ok: boolean;
	internalCode: number;
	prefix: string;
	data: Nullable<T>;
	errors: unknown;
}

@injectable()
export class HttpResponse<T> {
	private internalCode: number;
	private prefix: string;
	private data: T;
	private errors?: unknown;

	constructor(internalCode: number, prefix: string, data: T, errors?: unknown) {
		this.internalCode = internalCode;
		this.prefix = prefix;
		this.data = data;
		this.errors = errors;
	}

	public getHttpResponseSuccess(): IHttpResponse<T> {
		return {
			ok: true,
			internalCode: this.internalCode,
			prefix: this.prefix,
			data: this.data,
			errors: null
		};
	}

	public getHttpResponseFailed(): IHttpResponse<T> {
		return {
			ok: false,
			internalCode: this.internalCode,
			prefix: this.prefix,
			data: null,
			errors: this.errors
		};
	}
}
