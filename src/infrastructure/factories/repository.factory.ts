import { UserRepository } from '@Infrastructure/repositories/user.repository';
import { container } from '@Config/inversify/inversify.config';
import { REPOSITORIES } from '@Config/inversify/inversify.symbol';
import { injectable } from 'inversify';

@injectable()
export class RepositoryFactory {

  public getUserRepository(): UserRepository {
    return container.get<UserRepository>(REPOSITORIES.UserRepository);
  }
}