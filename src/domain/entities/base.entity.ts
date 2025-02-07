import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamp', default: Date.now() })
  createdAt!: Date;

  @CreateDateColumn({ type: 'timestamp', default: Date.now() })
  updatedAt!: Date;
}