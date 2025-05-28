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

  // Modern Gen Z Canvas Image Generation
  const generateMessageImage = (messageText) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    try {
      // Mobile-friendly canvas size (Instagram story ratio but smaller for mobile)
      const isMobile = window.innerWidth <= 768
      canvas.width = isMobile ? 540 : 1080
      canvas.height = isMobile ? 960 : 1920

      // Modern Gen Z gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#ff9a9e")
      gradient.addColorStop(0.2, "#fecfef")
      gradient.addColorStop(0.4, "#fecfef")
      gradient.addColorStop(0.6, "#a8edea")
      gradient.addColorStop(0.8, "#fed6e3")
      gradient.addColorStop(1, "#d299c2")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add aesthetic noise texture
      for (let i = 0; i < 200; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, Math.random() * 3)
      }

      // Aesthetic geometric shapes
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 100 + 50, 0, 2 * Math.PI)
        ctx.fill()
      }

      // Modern border with rounded corners effect
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.lineWidth = 8
      ctx.setLineDash([20, 10])
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)
      ctx.setLineDash([])

      // Trendy title with shadow
      const titleSize = isMobile ? 28 : 48
      ctx.font = `bold ${titleSize}px Arial, sans-serif`
      ctx.textAlign = "center"

      // Title shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
      ctx.fillText("✨ college memories ✨", canvas.width / 2 + 3, 150 + 3)

      // Title main
      ctx.fillStyle = "#ffffff"
      ctx.fillText("✨ college memories ✨", canvas.width / 2, 150)

      // Aesthetic decorative elements (Gen Z style)
      const emojiSize = isMobile ? 24 : 40
      ctx.font = `${emojiSize}px Arial`

      // Scattered aesthetic emojis
      const aestheticEmojis = ["✨", "💫", "🌸", "🦋", "💖", "🌙", "⭐", "🌺", "💝", "🎀"]
      const positions = [
        [100, 200],
        [canvas.width - 100, 220],
        [80, 350],
        [canvas.width - 80, 380],
        [120, canvas.height - 300],
        [canvas.width - 120, canvas.height - 280],
        [60, canvas.height / 2],
        [canvas.width - 60, canvas.height / 2 + 50],
      ]

      positions.forEach((pos, index) => {
        if (index < aestheticEmojis.length) {
          ctx.fillText(aestheticEmojis[index], pos[0], pos[1])
        }
      })

      // Main message with modern styling
      const messageSize = isMobile ? 18 : 32
      ctx.font = `${messageSize}px Arial, sans-serif`
      ctx.textAlign = "center"

      // Word wrap for mobile compatibility
      const words = messageText.split(" ")
      const lines = []
      let currentLine = ""
      const maxWidth = canvas.width - (isMobile ? 80 : 160)

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

      // Limit lines for mobile
      const maxLines = isMobile ? 15 : 20
      const displayLines = lines.slice(0, maxLines)
      if (lines.length > maxLines) {
        displayLines[maxLines - 1] = displayLines[maxLines - 1] + "..."
      }

      // Draw text with modern styling
      const lineHeight = isMobile ? 25 : 45
      const startY = (canvas.height - displayLines.length * lineHeight) / 2

      displayLines.forEach((line, index) => {
        const yPos = startY + index * lineHeight

        // Text shadow for readability
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
        ctx.fillText(line, canvas.width / 2 + 2, yPos + 2)

        // Main text
        ctx.fillStyle = "#ffffff"
        ctx.fillText(line, canvas.width / 2, yPos)
      })

      // Modern footer
      const footerSize = isMobile ? 14 : 24
      ctx.font = `bold ${footerSize}px Arial, sans-serif`
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fillText("made with 💖 for the memories", canvas.width / 2, canvas.height - 120)

      // Trendy hashtags
      const hashtagSize = isMobile ? 12 : 20
      ctx.font = `${hashtagSize}px Arial, sans-serif`
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.fillText("#collegelife #memories #friendship #nostalgia", canvas.width / 2, canvas.height - 80)

      // Convert to blob with error handling
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setGeneratedImageUrl(url)
          } else {
            console.error("Failed to create blob")
          }
        },
        "image/png",
        0.9,
      )
    } catch (error) {
      console.error("Canvas error:", error)
      alert("Sorry, image generation failed on this device. Please try on desktop.")
    }
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

      // Generate image after getting the message with delay for mobile
      setTimeout(() => {
        generateMessageImage(data.message)
      }, 200)
    } catch (error) {
      console.error("Error generating message:", error)
      setGeneratedMessage("Something went wrong while generating your message. Please try again later.")

      // Generate image even with error message
      setTimeout(() => {
        generateMessageImage("Something went wrong while generating your message. Please try again later.")
      }, 200)
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced Instagram sharing for mobile
  const shareImageToInstagram = async () => {
    if (!generatedImageUrl) return

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      try {
        // Try Web Share API with files first (works on some mobile browsers)
        if (navigator.share && navigator.canShare) {
          const response = await fetch(generatedImageUrl)
          const blob = await response.blob()
          const file = new File([blob], "college-memory.png", { type: "image/png" })

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "My College Memory",
              text: "Check out my college memory! 💖",
              files: [file],
            })
            return
          }
        }

        // Fallback: Copy image and try Instagram URL scheme
        const response = await fetch(generatedImageUrl)
        const blob = await response.blob()

        if (navigator.clipboard && navigator.clipboard.write) {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ])

          // Try Instagram URL scheme for mobile
          const instagramUrl = "instagram://story-camera"
          window.location.href = instagramUrl

          // Fallback to regular Instagram if URL scheme doesn't work
          setTimeout(() => {
            window.open("https://www.instagram.com/", "_blank")
          }, 1000)

          alert("📸 Image copied! Instagram should open now. If not, paste the image in Instagram Stories!")
        } else {
          // Final fallback: download
          downloadImage()
          alert("📱 Image downloaded! Open Instagram Stories and select the image from your gallery.")
        }
      } catch (error) {
        console.error("Mobile sharing error:", error)
        downloadImage()
        alert("📱 Image downloaded! Open Instagram Stories and select the image from your gallery.")
      }
    } else {
      // Desktop: download and copy
      downloadImage()
      copyImageToClipboard()
    }
  }

  const downloadImage = () => {
    if (!generatedImageUrl) return

    const link = document.createElement("a")
    link.download = "college-memory-aesthetic.png"
    link.href = generatedImageUrl
    link.click()
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

      alert("🖼️ Image copied to clipboard! You can now paste it anywhere.")
    } catch (error) {
      console.error("Failed to copy image:", error)
      alert("Couldn't copy image. Image has been downloaded instead!")
      downloadImage()
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
              title: "My College Memory",
              text: "Check out my college memory! 💖",
              files: [file],
            })
          })
          .catch(() => {
            // Fallback to text sharing
            navigator
              .share({
                title: "My College Memory",
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
                      <div className="output-header">📝 Your Aesthetic Memory</div>

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
                              borderRadius: "8px",
                            }}
                          />
                          <div style={{ marginTop: "0.5rem", fontSize: "12px", color: "#00ff00" }}>
                            ✨ Aesthetic Story Ready!
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
                          📸 Instagram Story
                        </button>
                        {generatedImageUrl && (
                          <>
                            <button onClick={downloadImage} className="retro-action-btn">
                              💾 Save
                            </button>
                            <button onClick={copyImageToClipboard} className="retro-action-btn">
                              📋 Copy
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
