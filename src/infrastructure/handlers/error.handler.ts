import { ErrorException } from '@Domain/exception/error.exception';
import { HttpResponse } from '@Domain/models/http-response.model';
import type { NextFunction, Request, Response } from 'express';

export class ErrorHandler {
	public static handle(error: Error, _req: Request, res: Response, _next: NextFunction): any {
		const response = new HttpResponse<Error>({
			message: error.message
		});

		if (error instanceof ErrorException) {
			response.internalCode = error.internalCode;
			return res.status(400).json(response.getHttpResponseFailed());
		}

		response.internalCode = 5000;
		response.message = 'Error interno del servidor';

		return res.status(400).json(response.getHttpResponseFailed());
	}
}
