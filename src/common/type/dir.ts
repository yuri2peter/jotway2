import { z } from 'zod';
import { zodSafeString, zodSafeNumber, zodSafeBoolean } from '../utils/type';

export const DirSchema = z.object({
  id: zodSafeString(),
  name: zodSafeString(),
  parentId: zodSafeString(),
  createdAt: zodSafeNumber(),
});

export const DirNavItemSchema = DirSchema.extend({
  opened: zodSafeBoolean(),
  active: zodSafeBoolean(),
});

export type Dir = z.infer<typeof DirSchema>;
export type DirNavItem = z.infer<typeof DirNavItemSchema>;
