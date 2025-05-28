import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createCanvas, loadImage, registerFont } from "canvas"

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
const textModel = google("gemini-2.0-flash")

// Helper to create full URL
const getImageUrl = (req, filename) => `${req.protocol}://${req.get("host")}/images/${filename}`

// Function to create aesthetic image with text
async function createTextImage(text, style = "aesthetic") {
  const canvas = createCanvas(1080, 1920) // Instagram story size
  const ctx = canvas.getContext('2d')

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, 1920)
  
  // Different aesthetic styles
  const styles = {
    aesthetic: ['#FFB6C1', '#E6E6FA', '#F0E68C', '#98FB98'],
    sunset: ['#FF6B6B', '#FF8E8E', '#FFB347', '#FFD700'],
    ocean: ['#87CEEB', '#B0E0E6', '#AFEEEE', '#E0FFFF'],
    vintage: ['#DDA0DD', '#F0E68C', '#FFB6C1', '#E6E6FA']
  }
  
  const selectedColors = styles[style] || styles.aesthetic
  selectedColors.forEach((color, index) => {
    gradient.addColorStop(index / (selectedColors.length - 1), color)
  })
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1080, 1920)

  // Add subtle overlay pattern
  ctx.globalAlpha = 0.1
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(Math.random() * 1080, Math.random() * 1920, Math.random() * 3, 0, 2 * Math.PI)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  // Set up text styling
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Add text shadow for better readability
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.shadowBlur = 10
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2

  // Calculate font size based on text length
  const baseSize = Math.max(32, Math.min(48, 1000 / text.length))
  ctx.font = `${baseSize}px Arial, sans-serif`

  // Word wrap function
  function wrapText(text, maxWidth) {
    const words = text.split(' ')
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + ' ' + word).width
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  // Wrap and draw text
  const lines = wrapText(text, 900) // Leave margin
  const lineHeight = baseSize * 1.4
  const totalHeight = lines.length * lineHeight
  const startY = (1920 - totalHeight) / 2

  lines.forEach((line, index) => {
    ctx.fillText(line, 540, startY + (index * lineHeight))
  })

  return canvas.toBuffer('image/png')
}

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

    // Generate image with the text
    try {
      const imageBuffer = await createTextImage(generatedText, 'aesthetic')
      const filename = `memory_${Date.now()}.png`
      const filepath = path.join(imagesDir, filename)
      
      fs.writeFileSync(filepath, imageBuffer)
      
      return res.json({ 
        message: generatedText, 
        imageUrl: getImageUrl(req, filename) 
      })
    } catch (imageError) {
      console.error("Image generation error:", imageError)
      return res.json({ message: generatedText }) // fallback without image
    }
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({
      message: `Dear ${req.body.name || "Friend"},\n\nWe're having a bit of a tech hiccup, but your story still matters. Please try again soon.`,
    })
  }
})

// /api/generate-image
app.post("/api/generate-image", async (req, res) => {
  try {
    const { text, style } = req.body
    if (!text) {
      return res.status(400).json({ message: "Text is required for image generation" })
    }

    const imageBuffer = await createTextImage(text, style || 'aesthetic')
    const filename = `memory_${Date.now()}.png`
    const filepath = path.join(imagesDir, filename)
    
    fs.writeFileSync(filepath, imageBuffer)
    
    return res.json({ imageUrl: getImageUrl(req, filename) })
  } catch (error) {
    console.error("Image generation error:", error)
    res.status(500).json({ message: "Failed to generate image. Please try again." })
  }
})

app.listen(3001, () => {
  console.log("✅ API server running on http://localhost:3001")
})