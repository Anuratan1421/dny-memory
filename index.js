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

    const result = await generateText({
      model,
      prompt: `Create a beautiful, nostalgic message for ${name} about their engineering journey. Their message: "${message}".`
    });

    res.json({ message: result.text });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      message: `Dear ${req.body.name || "Friend"},\n\nWe're having a bit of a tech hiccup, but your story still matters.`
    });
  }
});

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
