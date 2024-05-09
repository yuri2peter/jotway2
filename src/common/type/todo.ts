import { z } from 'zod';
import { zodSafeString, zodSafeBoolean, zodSafeNumber } from '../utils/type';

export const TodoItemSchema = z.object({
  id: zodSafeString(),
  title: zodSafeString(),
  completed: zodSafeBoolean(),
  updatedAt: zodSafeNumber(),
});

export type TodoItem = z.infer<typeof TodoItemSchema>;
