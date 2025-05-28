import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request) {
  try {
    const { name, message } = await request.json()

    const result = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `Create a beautiful, nostalgic message for ${name} about their engineering journey. Their message: "${message}". 

      Create a heartfelt message that captures the essence of their engineering college experience. Include themes like:
      - The beautiful journey through engineering
      - Late night coding sessions and project deadlines
      - Friendships made in labs and classrooms
      - Growth from freshman to graduate
      - Memories of campus life, canteen chai, and study groups
      - The bittersweet feeling of ending this chapter
      
      Make it personal, warm, and nostalgic. Keep it around 100-150 words. Start with their name.`,
    })

    return Response.json({ message: result.text })
  } catch (error) {
    console.error("Error:", error)

    // Fallback message if API fails
    const fallbackMessage = `Dear ${name || "Friend"},

What a beautiful journey it has been! These four years of engineering weren't just about algorithms and equations - they were about the friendships forged in late-night lab sessions, the laughter shared over campus chai, and the memories that will last a lifetime.

Your engineering journey has shaped you in ways you're only beginning to understand. From those first nervous days in freshman year to now - you've grown, learned, and created bonds that will last forever.

As you step into the next chapter, carry these memories with you. The late-night coding sessions, the project deadlines, the moments of triumph and the lessons from failure - they're all part of your beautiful story.

Here's to the amazing engineer you've become and the incredible future ahead! 🎓✨`

    return Response.json({ message: fallbackMessage })
  }
}
