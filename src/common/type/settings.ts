import { z } from 'zod';
import { zodSafeString } from '../utils/type';

export const SettingsSchema = z.object({ geminiKey: zodSafeString() });
