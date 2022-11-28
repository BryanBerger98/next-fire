export type User = {
	uid: string;
	email: string;
	emailVerified: boolean;
	phoneNumber?: string;
	displayName?: string;
	photoURL?: string;
	role: string;
	disabled: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type CreateUserDTO = {
	email: string;
	emailVerified?: boolean;
	phoneNumber?: string;
	displayName?: string;
	photoURL?: string;
	role?: string;
	disabled: boolean;
};
