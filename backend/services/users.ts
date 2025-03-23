// Example user data configuration for testing

import type { User } from "../types";

export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UserService {
	public get(id: number, name?: string): User {
		return {
			id,
			email: "jane@doe.com",
			name: name ?? "Jane Doe",
			status: "Happy",
			phoneNumbers: [],
		};
	}

	public create(userCreationParams: UserCreationParams): User {
		return {
			id: Math.floor(Math.random() * 10000), // Random
			status: "Happy",
			...userCreationParams,
		};
	}
}
