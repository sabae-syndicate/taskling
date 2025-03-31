// Example user schema for testing
export interface User {
	id: number;
	email: string;
	name: string;
	status?: "Happy" | "Sad";
	phoneNumbers: string[];
}

// Could then define UserIn, UserOut, etc models
