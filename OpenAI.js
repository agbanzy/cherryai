// OpenAI.js

import axios from 'axios';

const OPENAI_API = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const API_KEY = '<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>';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`,
};

const generateText = async (prompt) => {
  try {
    const payload = {
      prompt,
      max_tokens: 50,
    };

    const response = await axios.post(OPENAI_API, payload, { headers });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}

export { generateText };
 