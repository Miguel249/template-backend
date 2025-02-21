export interface JwtPayloadData<T> {
	payload: T;
	check: boolean;
	date: string;
}

export class TokenData<T> {
	private _isExpired: boolean;
	private _isNotValid: boolean;
	private _data: T;

	private constructor(isExpired: boolean, isNotValid: boolean, data: T) {
		this._isExpired = isExpired;
		this._isNotValid = isNotValid;
		this._data = data;
	}

	get isExpired() {
		return this._isExpired;
	}

	get isNotValid() {
		return this._isNotValid;
	}

	get data() {
		return this._data;
	}

	static create<T>(args: { isExpired: boolean; isNotValid: boolean; data: T }) {
		return new TokenData(args.isExpired, args.isNotValid, args.data);
	}
}
