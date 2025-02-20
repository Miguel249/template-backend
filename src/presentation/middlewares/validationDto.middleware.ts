import { HttpResponse } from '@Domain/models/http-response.model';
import { MiddlewareBase } from '@Domain/models/middleware.model';
import { plainToInstance } from 'class-transformer';
import { type ValidationError, validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class ValidationDtoMiddleware extends MiddlewareBase {
	public run = (dtoClass: new () => object, message: string): any => {
		return async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
			const dtoInstance = plainToInstance(dtoClass, req.body);

			const errors = await validate(dtoInstance);

			if (errors.length > 0) {
				const formattedErrors = errors.map(err => ({
					property: err.property,
					constraints: err.constraints
				}));

				const response = new HttpResponse<ValidationError[]>({
					message: message,
					errors: formattedErrors
				}).getHttpResponseFailed();

				return res.status(400).json(response);
			}

			req.body = dtoInstance;
			return next();
		};
	};
}
