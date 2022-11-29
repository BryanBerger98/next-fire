export type User = {
	uid: string;
	email: string;
	emailVerified: boolean;
	phoneNumber?: string;
	displayName?: string;
	photoURL?: string;
	role: 'admin' | 'user';
	disabled: boolean;
	createdAt: Date | {
		_nanoseconds: number;
		_seconds: number;
	};
	updatedAt: Date | null;
};

export type CreateUserDTO = {
	email: string;
	emailVerified: boolean;
	phoneNumber?: string;
	displayName?: string;
	photoURL?: string;
	role: 'admin' | 'user';
	disabled: boolean;
};
