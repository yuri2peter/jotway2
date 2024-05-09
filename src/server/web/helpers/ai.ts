import lodash from 'lodash';
import axios from 'axios';
import db from 'src/server/data/db';

const geminiApi =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro';

export async function generateContent(text: string) {
  try {
    const { data } = await axios.post(
      geminiApi + ':generateContent?key=' + db().get().settings.geminiKey,
      {
        contents: [
          {
            parts: [
              {
                text,
              },
            ],
          },
        ],
      }
    );
    return lodash.get(data, 'candidates[0].content.parts[0].text', '');
  } catch (error) {
    console.warn((error as any)?.response?.data);
    return 'Generate content failed.';
  }
}
