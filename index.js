import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Create images directory if it doesn't exist
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.join(__dirname, "public", "images")
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

// Serve static files
app.use("/images", express.static(imagesDir))

// Models
const textModel = google("gemini-1.5-flash")
const imageModel = google("gemini-2.0-flash")

// Helper to create full URL
const getImageUrl = (req, filename) => `${req.protocol}://${req.get("host")}/images/${filename}`

// /api/generate
app.post("/api/generate", async (req, res) => {
  try {
    const { name, message } = req.body
    if (!name || !message) {
      return res.status(400).json({ message: "Both 'name' and 'message' are required fields." })
    }

    const prompt = `
Write a beautifully written, emotionally rich message for a friend named ${name}, using this input: "${message}".
Guidelines:
- Do not invent false stories or scenarios.
- Enhance the original message with deeper emotional layers, creativity, and warmth.
- Use poetic language, metaphors, and vivid descriptions where appropriate.
- Add uniqueness — make it something the user wouldn't have written themselves.
- Keep it short (under 150 words), heartfelt, and grounded in the truth.
Output:
`

    const result = await generateText({ model: textModel, prompt })
    const generatedText = result.text.trim()

    // Generate image
    try {
      const imagePrompt = `
Create a beautiful aesthetic image for Instagram that visualizes this message:
"${generatedText}"

The image should:
- Have a dreamy, aesthetic quality with soft pastel colors
- Include the text elegantly integrated into the design
- Be suitable for Instagram stories
- Have a modern, Gen Z appeal with aesthetic elements
- Include visual elements that represent friendship, memories, and nostalgia
- Be in portrait orientation (9:16 ratio) for Instagram stories
`

      const imageResult = await generateText({
        model: imageModel,
        prompt: imagePrompt,
        providerOptions: { google: { responseModalities: ["TEXT", "IMAGE"] } },
      })

      if (imageResult.files?.length > 0) {
        const imageFile = imageResult.files.find((f) => f.mimeType.startsWith("image/"))
        if (imageFile) {
          const filename = `memory_${Date.now()}.png`
          const filepath = path.join(imagesDir, filename)
          const base64Data = imageFile.base64.split(",")[1]
          fs.writeFileSync(filepath, Buffer.from(base64Data, "base64"))
          return res.json({ message: generatedText, imageUrl: getImageUrl(req, filename) })
        }
      }

      return res.json({ message: generatedText }) // no image
    } catch (imageError) {
      console.error("Image generation error:", imageError)
      return res.json({ message: generatedText }) // fallback
    }
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({
      message: `Dear ${req.body.name || "Friend"},\n\nWe're having a bit of a tech hiccup, but your story still matters. Please try again soon.`,
    })
  }
})

// /api/generate-image
import { createCanvas, loadImage } from "canvas"

app.post("/api/generate-image", async (req, res) => {
  try {
    const { text, style } = req.body

    if (!text) {
      return res.status(400).json({ message: "Text is required for image generation" })
    }

    const width = 1080
    const height = 1920
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")

    // Optional: pastel background
    ctx.fillStyle = "#fbeaff" // pastel background
    ctx.fillRect(0, 0, width, height)

    // Optional: overlay gradient for vibe
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, "rgba(255, 240, 245, 0.8)")
    gradient.addColorStop(1, "rgba(173, 216, 230, 0.8)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw text
    ctx.fillStyle = "#333"
    ctx.font = "bold 40px 'Courier New'"
    ctx.textAlign = "center"

    const lines = wrapText(ctx, text, width - 100)
    const startY = height / 3

    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, startY + i * 50)
    })

    // Save to disk
    const filename = `memory_${Date.now()}.png`
    const filepath = path.join(imagesDir, filename)

    const out = fs.createWriteStream(filepath)
    const stream = canvas.createPNGStream()
    stream.pipe(out)

    out.on("finish", () => {
      return res.json({ imageUrl: getImageUrl(req, filename) })
    })

  } catch (error) {
    console.error("Image generation error:", error)
    res.status(500).json({ message: "Failed to generate image. Please try again." })
  }
})

// Helper: word-wrap text
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ")
  const lines = []
  let line = ""

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " "
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width

    if (testWidth > maxWidth && n > 0) {
      lines.push(line.trim())
      line = words[n] + " "
    } else {
      line = testLine
    }
  }

  lines.push(line.trim())
  return lines
}


app.listen(3001, () => {
  console.log("✅ API server running on http://localhost:3001")
})
