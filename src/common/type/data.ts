import { z } from 'zod';
import { zodSafeArray, zodSafeString, zodSafeType } from '../utils/type';
import { TodoItemSchema } from './todo';
import { SettingsSchema } from './settings';
import { FileDropItemSchema } from './fileDrop';

export const version = 1;
export const DataSchema = z.object({
  settings: zodSafeType(SettingsSchema),
  todoItems: zodSafeArray(TodoItemSchema),
  jottings: zodSafeString(),
  fileDrop: zodSafeArray(FileDropItemSchema),
});
export type Data = z.infer<typeof DataSchema>;
export const defaultValue = DataSchema.parse({});
