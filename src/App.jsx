"use client"

import { useState, useRef } from "react"
import "./App.css"

export default function App() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFullStory, setShowFullStory] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState("")
  const canvasRef = useRef(null)

  const story = `Last Bell Ring Again…
The corridors are quieter now. Canteens that echoed with laughter now serve their last few cups of chai. Slowly, the campus begins to breathe differently—as if it knows something is ending.

It's the final week. College is officially over.

A group of students sits outside the main block—some leaning on their bikes, some on the grass, some just... standing. No one's really in a hurry. There are no deadlines left to chase, no submissions, no viva prep. Only moments—and the urge to stretch them a little longer.

One of them says, "These four years… where did they even go?"

No one replies immediately. Not because they don't agree—but because they all feel it in their own way.

This wasn't just a college. It became something else. A world of its own.

Some lived it through hostel corridors and 2 AM Maggi. Some through morning lectures, bun maska and chai in the canteen, and rushing to catch the 5 PM bus. Some built memories in labs and fests; others through clubs, sports grounds, libraries. But everyone, in their own corner of this world, found something that now feels impossible to leave behind: their people.

The friends they made in these four years—friends who sat beside them in lectures, shared notes during internals, waited outside exam halls, randomly made reels, gave birthday surprises, argued over silly things, and showed up unasked when everything was falling apart—they weren't just collegemates. They became the heart of this journey.

Now that journey has a full stop. And the same group that once walked in nervously as strangers is walking out as something closer than family.

But along with the warmth of friendship, something heavier lingers: the fear that it won't stay the same.

Everyone promises to stay in touch. "We'll video call every weekend," someone says. There's laughter—part genuine, part knowing. Because deep down, these promises carry more weight than just hope.

But this not first time Back in school, after 10th or 12th, the goodbyes felt just as permanent. You swore those were the most special bonds you'd ever make. You wrote farewell notes and cried over slam books, believing nothing would never replace your school friends. You thought no friendship could come close.

And yet—college happened. New people entered. Strangers slowly became lifelines. And without even noticing, those school friendships—the ones you swore would never fade—slowly shifted into the background.

And that's where the irony quietly lives.

Because now, watching these college students hold onto each other so tightly, making the same promises, feeling the same heartbreak…

You can't help but remember they've said this all before.

They don't see it. Not yet. They think this is the one friendship that won't fade. That they'll prove life wrong. That this time, it's different.

But the narrator knows—there's a familiar rhythm to these endings.

They're sad about parting from their friends but
They're unknowingly grieving something they've already grieved before.

And in that repetition… lies a quiet, bittersweet truth about how we love, and how we let go.

But maybe that's what growing up really is. Not about holding on forever, but learning to carry people with you, even as paths diverge.

And while these bonds may stretch, twist, and sometimes quiet down—some of them will last. Through time zones, jobs, marriages, silence, and even distance.

Years later, when life feels heavier and simpler at once, one random evening someone will text in that dusty college group:

"Remember that chat wala outside the campus?"

And just like that, you'll all be 21 again.

Because some friendships may fade from routine…
But never from heart.

So here's to the friendships made in these four years—whether born in hostel rooms, classrooms, corridors, or under the college tree.

They may not stay the same. But they'll always stay with you.`

  // Canvas image generation function
  const generateMessageImage = (messageText) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas size for Instagram story (1080x1920)
    canvas.width = 1080
    canvas.height = 1920

    // Create retro gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#87ceeb")
    gradient.addColorStop(0.3, "#4169e1")
    gradient.addColorStop(0.6, "#32cd32")
    gradient.addColorStop(1, "#ff6b35")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add retro pattern overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 0; i < canvas.width; i += 60) {
      for (let j = 0; j < canvas.height; j += 60) {
        if ((i + j) % 120 === 0) {
          ctx.fillRect(i, j, 30, 30)
        }
      }
    }

    // Add decorative border
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 12
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120)

    // Add inner border
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 4
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160)

    // Add title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 56px Courier New"
    ctx.textAlign = "center"
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 3
    ctx.strokeText("💾 College Memories", canvas.width / 2, 200)
    ctx.fillText("💾 College Memories", canvas.width / 2, 200)

    // Add retro decorative elements
    ctx.font = "72px Arial"
    ctx.fillStyle = "#ffd700"
    ctx.fillText("✨", 200, 300)
    ctx.fillText("📚", canvas.width - 200, 300)
    ctx.fillText("🎓", 150, 400)
    ctx.fillText("❤️", canvas.width - 150, 400)
    ctx.fillText("👫", 200, canvas.height - 300)
    ctx.fillText("🌈", canvas.width - 200, canvas.height - 300)

    // Add main message with better formatting
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 36px Courier New"
    ctx.textAlign = "center"

    // Word wrap the message
    const words = messageText.split(" ")
    const lines = []
    let currentLine = ""
    const maxWidth = canvas.width - 200

    words.forEach((word) => {
      const testLine = currentLine + word + " "
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && currentLine !== "") {
        lines.push(currentLine.trim())
        currentLine = word + " "
      } else {
        currentLine = testLine
      }
    })
    lines.push(currentLine.trim())

    // Draw the text lines with shadow effect
    const lineHeight = 50
    const startY = (canvas.height - lines.length * lineHeight) / 2

    lines.forEach((line, index) => {
      // Shadow
      ctx.fillStyle = "#333"
      ctx.fillText(line, canvas.width / 2 + 3, startY + index * lineHeight + 3)
      // Main text
      ctx.fillStyle = "#ffffff"
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight)
    })

    // Add footer with retro styling
    ctx.font = "bold 32px Courier New"
    ctx.fillStyle = "#ffd700"
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.strokeText("Made with ❤️ for Engineering Memories", canvas.width / 2, canvas.height - 200)
    ctx.fillText("Made with ❤️ for Engineering Memories", canvas.width / 2, canvas.height - 200)

    // Add hashtags
    ctx.font = "28px Courier New"
    ctx.fillStyle = "#ffffff"
    ctx.fillText("#EngineeringMemories #CollegeLife #Graduation", canvas.width / 2, canvas.height - 150)

    // Convert to blob and create URL
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      setGeneratedImageUrl(url)
    }, "image/png")
  }

  const shareStory = () => {
    const storyText =
      "Last Bell Ring Again... A beautiful story about college memories and friendships that last forever."
    const url = window.location.href

    if (navigator.share) {
      navigator
        .share({
          title: "Last Bell Ring Again - College Memories",
          text: storyText,
          url: url,
        })
        .catch(() => {
          copyToClipboard(storyText + "\n\n" + url)
        })
    } else {
      copyToClipboard(storyText + "\n\n" + url)
    }
  }

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Story copied to clipboard! You can now paste it anywhere to share.")
        })
        .catch(() => {
          fallbackCopyToClipboard(text)
        })
    } else {
      fallbackCopyToClipboard(text)
    }
  }

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand("copy")
      alert("Story copied to clipboard! You can now paste it anywhere to share.")
    } catch (err) {
      alert("Unable to copy. Please manually copy the story text.")
    }
    document.body.removeChild(textArea)
  }

  const shareToSocial = (platform) => {
    const text = encodeURIComponent("Check out this beautiful story about college memories! 📚✨")
    const url = encodeURIComponent(window.location.href)

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "instagram":
        copyToClipboard(
          "Last Bell Ring Again... A beautiful story about college memories and friendships that last forever.\n\n" +
            window.location.href,
        )
        window.open("https://www.instagram.com/", "_blank")
        break
    }
  }

  const generatePersonalMessage = async () => {
    if (!name.trim() || !message.trim()) {
      alert("Please enter both name and message")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      })

      const data = await response.json()
      setGeneratedMessage(data.message)

      // Generate image after getting the message
      setTimeout(() => {
        generateMessageImage(data.message)
      }, 100)
    } catch (error) {
      console.error("Error generating message:", error)
      setGeneratedMessage("Something went wrong while generating your message. Please try again later.")

      // Generate image even with error message
      setTimeout(() => {
        generateMessageImage("Something went wrong while generating your message. Please try again later.")
      }, 100)
    } finally {
      setIsLoading(false)
    }
  }

  // New sharing functions for images
  const downloadImage = () => {
    if (!generatedImageUrl) return

    const link = document.createElement("a")
    link.download = "college-memory-story.png"
    link.href = generatedImageUrl
    link.click()
  }

  const shareImageToInstagram = () => {
    if (!generatedImageUrl) return

    // Download the image first
    downloadImage()

    // Show instructions for Instagram
    setTimeout(() => {
      alert(
        "📸 Image downloaded! \n\n📱 To share on Instagram Story:\n1. Open Instagram app\n2. Tap '+' then 'Story'\n3. Select the downloaded image from your gallery\n4. Share your memory!",
      )
    }, 500)
  }

  const copyImageToClipboard = async () => {
    if (!generatedImageUrl) return

    try {
      const response = await fetch(generatedImageUrl)
      const blob = await response.blob()

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      alert("🖼️ Image copied to clipboard! You can now paste it in any app.")
    } catch (error) {
      console.error("Failed to copy image:", error)
      alert("Couldn't copy image. Please use the download option instead.")
    }
  }

  const shareGeneratedMessage = (platform) => {
    if (!generatedMessage) return

    const shareText = `${generatedMessage}\n\n#EngineeringMemories #CollegeLife #Graduation`

    if (platform) {
      switch (platform) {
        case "twitter":
          const text = encodeURIComponent(shareText)
          window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
          break
        case "instagram":
          shareImageToInstagram()
          break
        default:
          copyToClipboard(shareText)
      }
    } else {
      if (navigator.share && generatedImageUrl) {
        // Try to share the image if supported
        fetch(generatedImageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], "college-memory.png", { type: "image/png" })
            return navigator.share({
              title: "My Engineering Journey",
              text: "Check out my college memory!",
              files: [file],
            })
          })
          .catch(() => {
            // Fallback to text sharing
            navigator
              .share({
                title: "My Engineering Journey",
                text: shareText,
              })
              .catch(() => {
                copyToClipboard(shareText)
              })
          })
      } else {
        copyToClipboard(shareText)
      }
    }
  }

  return (
    <div className="app">
      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Retro Floating Elements */}
      <div className="retro-elements">
        <div className="retro-computer">
          <span>💻</span>
          <span>computer</span>
        </div>
        <div className="retro-hourglass">⏳</div>
        <div className="retro-star">✨</div>
        <div className="retro-heart">❤️</div>
        <div className="retro-globe">
          <span>🌐</span>
          <span>internet</span>
        </div>
        <div className="retro-mail">📧</div>
        <div className="retro-files">📁</div>
        <div className="retro-rainbow">🌈</div>
        <div className="retro-friendship">👫</div>
        <div className="retro-birds">🕊️</div>
        <div className="retro-love-letter">💌</div>
        <div className="retro-handshake">🤝</div>
        <div className="retro-gift">🎁</div>
        <div className="retro-camera">📷</div>
        <div className="retro-music">🎵</div>
        <div className="retro-balloon">🎈</div>
        <div className="retro-chat-bubble" title="Hello friend!">
          <div className="bubble-content">Hello friend!</div>
        </div>
      </div>

      {/* Retro Taskbar */}
      <div className="retro-taskbar">
        <div className="taskbar-left">
          <span className="taskbar-logo">💾 College Memories</span>
        </div>
        <div className="taskbar-right">
          <span className="taskbar-time">12:34 PM</span>
          <span className="taskbar-status">●</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Browser Window for Story */}
        <section className="browser-section">
          <div className="browser-window">
            <div className="browser-header">
              <div className="browser-buttons">
                <span className="btn-close">×</span>
                <span className="btn-minimize">−</span>
                <span className="btn-maximize">□</span>
              </div>
              <div className="browser-url">
                <span>📄 college-memories.html</span>
              </div>
            </div>
            <div className="browser-content">
              <div className="story-content">
                {showFullStory
                  ? story.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="story-paragraph">
                        {paragraph}
                      </p>
                    ))
                  : story
                      .split("\n\n")
                      .slice(0, 5)
                      .map((paragraph, index) => (
                        <p key={index} className="story-paragraph">
                          {paragraph}
                        </p>
                      ))}
                <div className="read-more">
                  <button className="retro-button" onClick={() => setShowFullStory(!showFullStory)}>
                    {showFullStory ? "Show Less ←" : "Read Full Story →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Share and Generator Row */}
        <div className="bottom-row">
          {/* Message Generator Window */}
          <section className="generator-window">
            <div className="window-frame">
              <div className="window-titlebar">
                <span>✨ Message Generator v1.0</span>
                <div className="window-controls">
                  <span>−</span>
                  <span>□</span>
                  <span>×</span>
                </div>
              </div>
              <div className="window-body">
                <div className="form-section">
                  <div className="input-group">
                    <label>Names:</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mention names "
                      className="retro-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Memory:</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write message..."
                      rows={3}
                      className="retro-textarea"
                    />
                  </div>
                  <button onClick={generatePersonalMessage} className="retro-generate-btn" disabled={isLoading}>
                    {isLoading ? "⏳ Generating..." : "🎯 Generate Message"}
                  </button>
                </div>

                {generatedMessage && (
                  <div className="output-section">
                    <div className="output-window">
                      <div className="output-header">📝 Your Message</div>

                      {/* Show generated image preview if available */}
                      {generatedImageUrl && (
                        <div style={{ padding: "1rem", textAlign: "center", background: "#000" }}>
                          <img
                            src={generatedImageUrl || "/placeholder.svg"}
                            alt="Generated memory"
                            style={{
                              width: "100%",
                              maxWidth: "200px",
                              height: "auto",
                              border: "2px solid #333",
                              borderRadius: "4px",
                            }}
                          />
                          <div style={{ marginTop: "0.5rem", fontSize: "12px", color: "#00ff00" }}>
                            📸 Instagram Story Ready!
                          </div>
                        </div>
                      )}

                      <div className="output-content">
                        <pre className="generated-text">{generatedMessage}</pre>
                      </div>
                      <div className="output-actions">
                        <button onClick={() => shareGeneratedMessage()} className="retro-action-btn">
                          📤 Share
                        </button>
                        <button onClick={() => shareGeneratedMessage("twitter")} className="retro-action-btn">
                          🐦 Tweet
                        </button>
                        <button onClick={() => shareGeneratedMessage("instagram")} className="retro-action-btn">
                          📸 Instagram
                        </button>
                        {generatedImageUrl && (
                          <>
                            <button onClick={downloadImage} className="retro-action-btn">
                              💾 Download
                            </button>
                            <button onClick={copyImageToClipboard} className="retro-action-btn">
                              📋 Copy Image
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Retro Share Section */}
          <section className="retro-share">
            <div className="share-window">
              <div className="window-header">
                <span>💾 Share Story</span>
                <span className="window-close">×</span>
              </div>
              <div className="share-content">
                <div className="share-buttons">
                  <button onClick={shareStory} className="retro-share-btn">
                    <span>📤</span>
                    Share
                  </button>
                  <button onClick={() => shareToSocial("twitter")} className="retro-share-btn twitter">
                    <span>🐦</span>
                    Twitter
                  </button>
                  <button onClick={() => shareToSocial("facebook")} className="retro-share-btn facebook">
                    <span>📘</span>
                    Facebook
                  </button>
                  <button onClick={() => shareToSocial("instagram")} className="retro-share-btn instagram">
                    <span>📸</span>
                    Instagram
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Retro Footer */}
        <footer className="retro-footer">
          <div className="footer-content">
            <span>Made with ❤️ </span>
            <span>© 1421</span>
            <div className="footer-rating">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
