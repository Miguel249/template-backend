import { DataSource } from 'typeorm';
import { DatabaseEnv } from '@Shared/infrastructure/environments/database-environments.config';
import { readdirSync } from 'fs';
import { join } from 'path';
import { injectable } from 'inversify';

@injectable()
export class Database {
  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: DatabaseEnv.DB_DIALECT as any,
      host: DatabaseEnv.DB_HOST,
      port: DatabaseEnv.DB_PORT,
      username: DatabaseEnv.DB_USER,
      password: DatabaseEnv.DB_PASS,
      database: DatabaseEnv.DB_NAME,
      synchronize: true,  //DO NOT USE IN PRODUCTION
      logging: false,
      entities: this.loadEntities(),
      migrations: [],
      subscribers: []
    });
  }

  private loadEntities(): Function[] {
    const entitiesPath = join(__dirname, '../../infrastructure/entities');
    const entities: Function[] = [];

    readdirSync(entitiesPath).forEach((file) => {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const entityModule = require(join(entitiesPath, file));
        const entityClass = entityModule[Object.keys(entityModule)[0]];

        if (typeof entityClass === 'function') {
          entities.push(entityClass);
        } else {
          console.warn(`⚠️ El archivo ${file} no exporta una clase de entidad válida.`);
        }
      }
    });
    return entities;
  }

  public async connect(): Promise<void> {
    try {
      await this.dataSource.initialize();
      console.log("✅ Database connected successfully.");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      process.exit(1);
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}
