import type { BaseEntity } from '@Domain/entities/base.entity';
import type { DataSource, EntityTarget, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T extends BaseEntity> {
	protected repo: Repository<T>;

	protected constructor(dataSource: DataSource, entityTarget: EntityTarget<T>) {
		this.repo = dataSource.getRepository(entityTarget);
	}

	public async findBy(where: FindOptionsWhere<T>, queryRunner?: QueryRunner): Promise<T[]> {
		return this.getRepo(queryRunner).findBy(where);
	}

	public async findAll(queryRunner?: QueryRunner): Promise<T[]> {
		return this.getRepo(queryRunner).find();
	}

	public async save(entity: T, queryRunner?: QueryRunner): Promise<T> {
		return this.getRepo(queryRunner).save(entity);
	}

	public async update(id: T['id'], data: QueryDeepPartialEntity<T>, queryRunner?: QueryRunner): Promise<void> {
		await this.getRepo(queryRunner).update(id, data);
	}

	private getRepo(queryRunner?: QueryRunner): Repository<T> {
		return queryRunner ? queryRunner.manager.getRepository(this.repo.target) : this.repo;
	}
}
