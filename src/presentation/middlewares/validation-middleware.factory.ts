import { injectable } from 'inversify';
import { ValidationDtoMiddleware } from '@Presentation/middlewares/validationDto.middleware';

@injectable()
export class ValidationMiddlewareFactory {
	create(dtoClass: new () => object): ValidationDtoMiddleware {
		return new ValidationDtoMiddleware(dtoClass);
	}
}
