import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const searchUserSchema = z.object({
  query: z.string().optional(),
  onlyName: z.boolean().optional(),
  onlyEmail: z.boolean().optional(),
});

export type SearchUserSchema = z.infer<typeof searchUserSchema>;

export const searchUserSchemaResolver = zodResolver(searchUserSchema);
