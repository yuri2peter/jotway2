import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import db from 'src/server/data/db';

const genAI = new GoogleGenerativeAI(db().get().settings.geminiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function generateContent(prompt: string): Promise<string> {
  const { response } = await model.generateContent(prompt);
  const text = response.text();
  return text;
}

export async function generateContentWithImage(
  prompt: string,
  imagePath: string
): Promise<string> {
  const image = {
    inlineData: {
      data: Buffer.from(fs.readFileSync(imagePath)).toString('base64'),
      mimeType: 'image/png',
    },
  };
  const { response } = await model.generateContent([prompt, image]);
  const text = response.text();
  return text;
}
