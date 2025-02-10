import { BaseEntity } from '@Domain/entities/base.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';

export abstract class BaseRepository<T extends BaseEntity> {
  protected repo: Repository<T>;

  constructor(dataSource: DataSource, entityTarget: EntityTarget<T>) {
    this.repo = dataSource.getRepository(entityTarget);
  }

  async findById(id: string): Promise<DbResult<T>> {
    try {
      const entity = await this.repo.findOne({where: {id} as any});
      return {data: entity, ok: !!entity};
    } catch (error) {
      return {data: null, ok: false, error: error};
    }
  }

  async findAll(): Promise<DbResult<T[]>> {
    try {
      const entities = await this.repo.find();
      return {data: entities, ok: true};
    } catch (error) {
      return {data: [], ok: false, error: error};
    }
  }

  async save(entity: T): Promise<DbResult<T>> {
    try {
      const savedEntity = await this.repo.save(entity);
      return {data: savedEntity, ok: true};
    } catch (error) {
      return {data: null, ok: false, error: error};
    }
  }

  async update(data: Partial<T>): Promise<DbResult<T>> {
    if (!data.id) {
      return {data: null, ok: false, error: "ID is required for update"};
    }

    try {
      const entity = await this.repo.findOne({where: {id: data.id} as any});
      if (!entity) return {data: null, ok: false, error: "Entity not found"};

      Object.assign(entity, data);
      const updatedEntity = await this.repo.save(entity);

      return {data: updatedEntity, ok: true};
    } catch (error) {
      return {data: null, ok: false, error: error};
    }
  }
}
