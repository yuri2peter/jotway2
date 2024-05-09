import { z } from 'zod';
import { zodSafeArray, zodSafeType } from '../utils/type';
import { TodoItemSchema } from './todo';
import { SettingsSchema } from './settings';

export const version = 1;
export const DataSchema = z.object({
  settings: zodSafeType(SettingsSchema),
  todoItems: zodSafeArray(TodoItemSchema),
});
export type Data = z.infer<typeof DataSchema>;
export const defaultValue = DataSchema.parse({});
