import { ErrorException } from '@Domain/exceptions/error.exception';
import { AuthenticationTokenData } from '@Domain/models/authentication-token-data.model';
import type { MiddlewareBase } from '@Domain/models/middleware.model';
import type { JwtPayloadData } from '@Shared/domain/models/jwt-payload-data.model';
import { SecurityManager } from '@Shared/domain/security/security-manager.security';
import { JwtService } from '@Shared/infrastructure/security/jwt-generator.security';
import type { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class AuthorizationMiddleware implements MiddlewareBase {
	public run = async (req: Request, _res: Response, next: NextFunction): Promise<unknown> => {
		try {
			const authorizationToken = req.headers['authorization'];

			if (!authorizationToken) {
				throw new ErrorException(2001, 'No se recibió un token de autenticación');
			}

			const isBearerToken = authorizationToken.toLowerCase().startsWith('bearer');

			if (!isBearerToken) {
				throw new ErrorException(2002, 'El token no se envió en el formato correcto');
			}

			const encryptedToken = authorizationToken.replace(/(\s|bearer|Bearer)/g, '');
			const token = SecurityManager.decryptToken(encryptedToken);

			if (!token) {
				throw new ErrorException(2003, 'El token no es valido');
			}

			const tokenDecoded = JwtService.verifyToken<AuthenticationTokenData>(token);

			if (tokenDecoded.isNotValid) throw new ErrorException(2003, 'El token no es valido');

			if (tokenDecoded.isExpired) throw new ErrorException(2004, 'El token ha expirado');

			const tokenContent = AuthenticationTokenData.create(
				(tokenDecoded.data as JwtPayloadData<AuthenticationTokenData>).payload
			);

			req.authentication_data = tokenContent;

			return next();
		} catch (error) {
			return next(error);
		}
	};
}
