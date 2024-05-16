import { z } from 'zod';
import { zodSafeString, zodSafeNumber, zodSafeArray } from '../utils/type';

export const NoteShortSchema = z.object({
  id: zodSafeString(),
  name: zodSafeString(),
  parentId: zodSafeString(),
  createdAt: zodSafeNumber(),
  summary: zodSafeString(),
});

export const NoteSchema = NoteShortSchema.extend({
  content: zodSafeString(),
  embeddings: zodSafeArray(zodSafeString()),
});

export type NoteShort = z.infer<typeof NoteShortSchema>;
export type Note = z.infer<typeof NoteSchema>;
