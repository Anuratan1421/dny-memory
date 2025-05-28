import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST endpoint for text generation
app.post('/api/generate', async (req, res) => {
  try {
    const { name, message } = req.body;

    const result = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: "AIzaSyBhuostcIitcY_OTsHqGqmiAf7mnYqExgw", // Use your API key directly here
      }),
      prompt: `Create a beautiful, nostalgic message for ${name} about their engineering journey. Their message: "${message}". Make it warm, emotional, and encouraging.`,
    });

    res.json({ message: result.text });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      message: `Dear ${req.body.name || "Friend"},\n\nIt seems we couldn’t fetch a special message right now, but your engineering journey is truly inspiring! Keep shining 🌟\n\nWarm regards,\nTeam DNY`,
    });
  }
});

// Start server
app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
