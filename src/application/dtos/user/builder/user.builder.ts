import type { User } from '@Infrastructure/entities/user';
import { SecurityManager } from '@Shared/domain/security/security-manager.security';

export class UserBuilder {
	private user: Partial<User> = {};

	constructor() {
		this.user.id = crypto.randomUUID();
		this.user.createdAt = new Date();
		this.user.updatedAt = new Date();
	}

	setName(name: string): UserBuilder {
		this.user.name = name;
		return this;
	}

	setEmail(email: string): UserBuilder {
		this.user.email = email;
		return this;
	}

	async setPassword(password: string): Promise<UserBuilder> {
		this.user.password = await SecurityManager.hashPassword(password);
		return this;
	}

	build(): User {
		if (!this.user.name || !this.user.email || !this.user.password) {
			throw new Error('Faltan propiedades obligatorias para construir un usuario');
		}

		return Object.assign(this.user);
	}
}
