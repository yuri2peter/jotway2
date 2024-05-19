import { GoogleGenerativeAI } from '@google/generative-ai';
import db from 'src/server/data/db';

const genAI = new GoogleGenerativeAI(db().get().settings.geminiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function generateContent(prompt: string): Promise<string> {
  const { response } = await model.generateContent(prompt);
  const text = response.text();
  return text;
}
