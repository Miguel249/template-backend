import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@Domain/entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Column({ type: 'varchar', length: 64 })
	name!: string;

	@Column({ type: 'varchar', length: 150, unique: true })
	email!: string;

	@Column({ type: 'text' })
	password!: string;
}
