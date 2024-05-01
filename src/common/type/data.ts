import { z } from 'zod';

export const version = 1;
export const DataSchema = z.object({});
export type Data = z.infer<typeof DataSchema>;
export const defaultValue = DataSchema.parse({});
