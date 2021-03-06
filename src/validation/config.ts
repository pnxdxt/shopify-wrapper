import {z} from 'zod';

export const configParser = z.object({
	domain: z.string(),
	token: z.string(),
	isStorefront: z.boolean().optional(),
});
