import type { Database } from '@Config/database/database.config';
import { CONFIG } from '@Config/inversify/inversify.symbol';
import { inject, injectable } from 'inversify';
import type { QueryRunner } from 'typeorm';

@injectable()
export class TransactionalRepository {
	constructor(@inject(CONFIG.Database) private dataBase: Database) {}

	public async execute<T>(operation: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
		const queryRunner: QueryRunner = this.dataBase.getDataSource().createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const result = await operation(queryRunner);
			await queryRunner.commitTransaction();
			return result;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}
}
