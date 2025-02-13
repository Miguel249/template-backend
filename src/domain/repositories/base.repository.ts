import type { BaseEntity } from '@Domain/entities/base.entity';
import type { DataSource, EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T extends BaseEntity> {
	protected repo: Repository<T>;

	protected constructor(dataSource: DataSource, entityTarget: EntityTarget<T>) {
		this.repo = dataSource.getRepository(entityTarget);
	}

	protected async findBy(where: FindOptionsWhere<T>): DbResult<T[]> {
		try {
			const entity = await this.repo.findBy(where);
			return { data: entity, ok: !!entity };
		} catch (error) {
			return { data: null, ok: false, error: error };
		}
	}

	protected async findAll(): DbResult<T[]> {
		try {
			const entities = await this.repo.find();
			return { data: entities, ok: true };
		} catch (error) {
			return { data: [], ok: false, error: error };
		}
	}

	protected async save(entity: T): DbResult<T> {
		try {
			const savedEntity = await this.repo.save(entity);
			return { data: savedEntity, ok: true };
		} catch (error) {
			return { data: null, ok: false, error: error };
		}
	}

	protected async update(id: T['id'], data: QueryDeepPartialEntity<T>): DbResult<T> {
		try {
			await this.repo.update(id, data);
			return { data: null, ok: true };
		} catch (error) {
			return { data: null, ok: false, error: error };
		}
	}
}
