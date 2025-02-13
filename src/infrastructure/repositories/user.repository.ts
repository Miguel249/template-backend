import { BaseRepository } from '@Domain/repositories/base.repository';
import { User } from '@Infrastructure/entities/user';
import { inject, injectable } from 'inversify';
import { CONFIG } from '@Config/inversify/inversify.symbol';
import type { Database } from '@Config/database/database.config';

@injectable()
export class UserRepository extends BaseRepository<User> {
	constructor(@inject(CONFIG.Database) protected database: Database) {
		super(database.getDataSource(), User);
	}
}
