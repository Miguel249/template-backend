import type { CreateUserDTO } from '@Application/dtos/user/request/create-user.dto';
import type { CreateUserUseCase } from '@Application/use-cases/user/create-user.usecase';
import { USECASES } from '@Config/inversify/inversify.symbol';
import { StatusCodesHttp } from '@Domain/enums/status-code-http.enum';
import { Controller } from '@Domain/models/controller.model';
import { HttpResponse } from '@Domain/models/http-response.model';
import type { User } from '@Infrastructure/entities/user';
import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateUserController extends Controller {
	constructor(@inject(USECASES.CreateUser) private readonly useCase: CreateUserUseCase) {
		super();
	}

	public run = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const body = req.body as CreateUserDTO;
			const data = await this.useCase.run(body);

			const response = new HttpResponse<User>({
				message: 'Usuario creado exitosamente',
				data: data
			}).getHttpResponseSuccess();

			return res.status(StatusCodesHttp.Ok).json(response);
		} catch (error) {
			return next(error);
		}
	};
}
