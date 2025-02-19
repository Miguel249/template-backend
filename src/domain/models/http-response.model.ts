import { injectable } from 'inversify';

export interface IHttpResponse<T> {
	ok: boolean;
	internalCode: number;
	prefix: string;
	message: string;
	data: Nullable<T>;
	errors: unknown;
}

@injectable()
export class HttpResponse<T> {
	public internalCode: number;
	public prefix: string;
	public message: string;
	public data: Nullable<T>;
	public errors?: unknown;

	constructor(
		data: Partial<{ internalCode: number; prefix: string; message: string; data: Nullable<T>; errors?: unknown }>
	) {
		this.internalCode = data.internalCode || 0;
		this.prefix = data.prefix || 'APP';
		this.message = data.message || '';
		this.data = data?.data || null;
		this.errors = data?.errors;
	}

	public getHttpResponseSuccess(): IHttpResponse<T> {
		return {
			ok: true,
			internalCode: this.internalCode,
			prefix: this.prefix,
			message: this.message,
			data: this.data,
			errors: null
		};
	}

	public getHttpResponseFailed(): IHttpResponse<T> {
		return {
			ok: false,
			internalCode: this.internalCode,
			prefix: this.prefix,
			message: this.message,
			data: null,
			errors: this.errors
		};
	}
}
