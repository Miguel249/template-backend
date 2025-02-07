import { BaseEntity } from '@Domain/entities/base.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { DbResult } from '@Shared/domain/@types';

export abstract class BaseRepository<T extends BaseEntity> {
  protected repo: Repository<T>;

  constructor(dataSource: DataSource, entityTarget: EntityTarget<T>) {
    this.repo = dataSource.getRepository(entityTarget);
  }

  async findById(id: string): DbResult<T> {
    return await this.repo.findOne({ where: { id } as any });
  }

  async findAll(): DbResult<T[]> {
    return await this.repo.find();
  }

  async save(entity: T): DbResult<T> {
    return await this.repo.save(entity);
  }

  async update(entity: T): DbResult<T> {
    return this.repo.update(entity.id, entity);
  }

  async delete(id: string): DbResult<T> {

  }
}