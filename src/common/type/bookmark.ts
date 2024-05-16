import { z } from 'zod';
import { zodSafeString, zodSafeNumber, zodSafeArray } from '../utils/type';

export const BookmarkShortSchema = z.object({
  id: zodSafeString(),
  name: zodSafeString(),
  parentId: zodSafeString(),
  createdAt: zodSafeNumber(),
  url: zodSafeString(),
  snapshot: zodSafeString(),
  summary: zodSafeString(),
});

export const BookmarkSchema = BookmarkShortSchema.extend({
  embeddings: zodSafeArray(zodSafeString()),
});

export type BookmarkShort = z.infer<typeof BookmarkShortSchema>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
