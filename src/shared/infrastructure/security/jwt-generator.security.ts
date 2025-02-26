import * as jwt from 'jsonwebtoken';
import { SystemEnvs } from '../environments/system-environments.config';
import { TokenData, type JwtPayloadData } from '@Shared/domain/models/jwt-payload-data.model';

const JSONparse = <T>(data: T) =>
	JSON.parse(JSON.stringify(data, (_key, value) => (typeof value === 'bigint' ? value.toString() : value)));

export class JwtService {
	private static readonly SECRET_KEY_TOKEN = SystemEnvs.SECRET_KEY_TOKEN;

	static generateToken<T>(data: T, expiresIn: number): string {
		const timeElapsed = Date.now();
		const timestamp = new Date(timeElapsed).toISOString();
		const payload: JwtPayloadData<T> = {
			payload: JSONparse(data),
			check: true,
			date: timestamp
		};
		return jwt.sign(payload, JwtService.SECRET_KEY_TOKEN, { expiresIn: expiresIn });
	}

	static verifyToken<T>(token: string): TokenData<Nullable<JwtPayloadData<T>>> {
		let isExpired = false;
		let isNotValid = false;
		let tokenDecoded: JwtPayloadData<T> | null = null;

		try {
			tokenDecoded = jwt.verify(token, JwtService.SECRET_KEY_TOKEN) as JwtPayloadData<T>;
		} catch (error: any) {
			if (error.name === 'TokenExpiredError') {
				isExpired = true;
			} else {
				isNotValid = true;
			}
		}

		return TokenData.create<Nullable<JwtPayloadData<T>>>({
			data: tokenDecoded,
			isExpired: isExpired,
			isNotValid: isNotValid
		});
	}
}
