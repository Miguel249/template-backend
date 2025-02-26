import * as argon2 from 'argon2';
import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

export class SecurityManager {
	private static readonly SECRET_KEY = process.env.ENCRYPTION_SECRET || randomBytes(32).toString('hex');
	private static readonly IV_LENGTH = 16;
	private static readonly ALGORITHM = 'aes-256-cbc';

	static async hashPassword(password: string): Promise<string> {
		return await argon2.hash(password, {
			type: argon2.argon2id,
			memoryCost: 2 ** 16,
			timeCost: 3,
			parallelism: 1
		});
	}

	static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
		return await argon2.verify(hashedPassword, password);
	}

	static encryptToken(token: string): string {
		const iv = randomBytes(SecurityManager.IV_LENGTH);
		const cipher = createCipheriv(SecurityManager.ALGORITHM, Buffer.from(SecurityManager.SECRET_KEY, 'hex'), iv);
		let encrypted = cipher.update(token, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		return `${iv.toString('hex')}:${encrypted}`;
	}

	static decryptToken(encryptedToken: string): string | null {
		try {
			const [ivHex, encrypted] = encryptedToken.split(':');
			const iv = Buffer.from(ivHex, 'hex');
			const decipher = createDecipheriv(SecurityManager.ALGORITHM, Buffer.from(SecurityManager.SECRET_KEY, 'hex'), iv);
			let decrypted = decipher.update(encrypted, 'hex', 'utf8');
			decrypted += decipher.final('utf8');
			return decrypted;
		} catch (error) {
			return null;
		}
	}
}
