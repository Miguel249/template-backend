import { HttpResponse } from '@Domain/models/http-response.model';
import { MiddlewareBase } from '@Domain/models/middleware.model';
import { plainToInstance } from 'class-transformer';
import { type ValidationError, validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';

export class ValidationDtoMiddleware extends MiddlewareBase {
	constructor(private readonly dtoClass: new () => object) {
		super();
	}

	public run = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
		const dtoInstance = plainToInstance(this.dtoClass, req.body);

		const errors = await validate(dtoInstance);

		if (errors.length > 0) {
			const formattedErrors = errors.map(err => ({
				property: err.property,
				constraints: err.constraints
			}));

			const response = new HttpResponse<ValidationError[]>({
				message: 'Usuario creado exitosamente',
				errors: formattedErrors
			}).getHttpResponseFailed();

			return res.status(400).json(response);
		}

		req.body = dtoInstance;
		return next();
	};
}
