import * as argon2 from 'argon2';

export class PasswordHasher {
	static async hash(password: string): Promise<string> {
		return await argon2.hash(password, {
			type: argon2.argon2id,
			memoryCost: 2 ** 16,
			timeCost: 3,
			parallelism: 1
		});
	}

	static async compare(password: string, hashedPassword: string): Promise<boolean> {
		return await argon2.verify(hashedPassword, password);
	}
}
