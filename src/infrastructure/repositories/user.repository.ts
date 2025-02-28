import { BaseRepository } from '@Domain/repositories/base.repository';
import { User } from '@Infrastructure/entities/user';
import { inject, injectable } from 'inversify';
import { CONFIG } from '@Config/inversify/inversify.symbol';
import type { PostgresDatabase } from '@Config/database/postgres-database.config';

@injectable()
export class UserRepository extends BaseRepository<User> {
	constructor(@inject(CONFIG.Database) protected database: PostgresDatabase) {
		super(database.getDataSource(), User);
	}
}
