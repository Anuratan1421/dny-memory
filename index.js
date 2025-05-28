import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const model = google("gemini-1.5-flash"); // Key will be read from env var

app.post('/api/generate', async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validate input
    if (!name || !message) {
      return res.status(400).json({
        message: "Both 'name' and 'message' are required fields."
      });
    }

const prompt = `
Write a beautifully written, emotionally rich message for a friend named ${name}, using this input: "${message}".

Guidelines:
- Do not invent false stories or scenarios.
- Enhance the original message with deeper emotional layers, creativity, and warmth.
- Use poetic language, metaphors, and vivid descriptions where appropriate.
- Add uniqueness — make it something the user wouldn’t have written themselves.
- Keep it short (under 150 words), heartfelt, and grounded in the truth.

Output:
`;


    const result = await generateText({
      model,
      prompt
    });

    res.json({ message: result.text.trim() });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: `Dear ${req.body.name || "Friend"},\n\nWe're having a bit of a tech hiccup, but your story still matters. Please try again soon.`
    });
  }
});


app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
