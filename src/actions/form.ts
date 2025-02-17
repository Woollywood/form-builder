'use server';

import { checkUser } from '@/helpers/auth';
import { prisma } from '@/lib/prisma';
import { createFormSchema, CreateFormSchema } from '@/schemas/CreateForm';
import { revalidatePath } from 'next/cache';

export const getFormStatus = async () => {
	const { id: userId } = await checkUser();

	const stats = await prisma.form.aggregate({
		where: {
			userId,
		},
		_sum: { visits: true, submissions: true },
	});

	const visits = stats._sum.visits || 0;
	const submissions = stats._sum.submissions || 0;

	return { visits, submissions };
};

export const createForm = async (values: CreateFormSchema) => {
	const { id: userId } = await checkUser();

	const validation = createFormSchema.safeParse(values);
	if (validation.error) {
		throw new Error('Validation error');
	}

	const { name, description } = values;
	const form = await prisma.form.create({
		data: { userId, name, description },
	});

	if (!form) {
		throw new Error('Something went wrong');
	}

	revalidatePath('/', 'layout');
	return form;
};

export const getForms = async () => {
	const { id: userId } = await checkUser();

	return await prisma.form.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
};

export const getFormById = async (id: string) => {
	const { id: userId } = await checkUser();

	return await prisma.form.findUnique({ where: { id, userId } });
};

export const updateFormContent = async (id: string, jsonContent: string) => {
	const { id: userId } = await checkUser();

	return await prisma.form.update({
		where: { userId, id },
		data: {
			content: jsonContent,
		},
	});
};

export const publishForm = async (id: string) => {
	const { id: userId } = await checkUser();

	const data = await prisma.form.update({
		where: { id, userId },
		data: {
			published: true,
		},
	});
	revalidatePath('/', 'layout');
	return data;
};
