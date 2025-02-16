'use server';

import { UserNotFoundError } from '@/errors/UserNotFoundError';
import { currentUser } from '@clerk/nextjs/server';

export const checkUser = async () => {
	const user = await currentUser();
	if (!user) {
		throw new UserNotFoundError();
	}
	return user;
};
