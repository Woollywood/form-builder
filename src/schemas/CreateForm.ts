import { z } from 'zod';

export const createFormSchema = z.object({
	name: z.string().min(4),
	description: z.string().nullable(),
});
export type CreateFormSchema = z.infer<typeof createFormSchema>;
