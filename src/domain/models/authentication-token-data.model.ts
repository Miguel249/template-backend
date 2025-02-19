export class AuthenticationTokenData {
	constructor(
		public readonly id: string,
		public readonly ip_connection: string
	) {}

	static create(data: {
		id: string;
		ip_connection: string;
	}) {
		return new AuthenticationTokenData(data.id, data.ip_connection);
	}

	equals(other: {
		id: string;
		ip_connection: string;
	}) {
		return other.id === this.id && other.ip_connection === this.ip_connection;
	}
}
