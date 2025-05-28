import { useState } from "react"
import "./App.css"

export default function App() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFullStory, setShowFullStory] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState("")
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

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

  const shareStory = () => {
    const storyText = "Last Bell Ring Again... A beautiful story about college memories and friendships that last forever."
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
    setGeneratedImageUrl("")

    try {
      const response = await fetch("https://dny-memory.onrender.com/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      })

      const data = await response.json()
      setGeneratedMessage(data.message)

      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl)
      } else {
        generateImageWithGemini(data.message)
      }
    } catch (error) {
      console.error("Error generating message:", error)
      setGeneratedMessage("Something went wrong while generating your message. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const generateImageWithGemini = async (messageText) => {
    setIsGeneratingImage(true)

    try {
      const response = await fetch("https://dny-memory.onrender.com/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: messageText,
          style: "aesthetic college memory with pastel colors, dreamy atmosphere, Instagram style",
        }),
      })

      const data = await response.json()

      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl)
      } else {
        console.error("No image URL returned")
      }
    } catch (error) {
      console.error("Error generating image:", error)
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const shareImageToInstagram = async () => {
    if (!generatedImageUrl) return

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      try {
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

        const response = await fetch(generatedImageUrl)
        const blob = await response.blob()

        if (navigator.clipboard && navigator.clipboard.write) {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ])

          window.location.href = "instagram://story-camera"

          setTimeout(() => {
            window.open("https://www.instagram.com/", "_blank")
          }, 1000)

          alert("📸 Image copied! Instagram should open now. Paste in Stories!")
        } else {
          downloadImage()
          alert("📱 Image downloaded! Open Instagram Stories and select the image.")
        }
      } catch (error) {
        console.error("Mobile sharing error:", error)
        downloadImage()
        alert("📱 Image downloaded! Open Instagram Stories and select the image.")
      }
    } else {
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

      alert("🖼️ Image copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy image:", error)
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

      <div className="retro-taskbar">
        <div className="taskbar-left">
          <span className="taskbar-logo">💾 College Memories</span>
        </div>
        <div className="taskbar-right">
          <span className="taskbar-time">12:34 PM</span>
          <span className="taskbar-status">●</span>
        </div>
      </div>

      <div className="main-content">
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

        <div className="bottom-row">
          <section className="generator-window">
            <div className="window-frame">
              <div className="window-titlebar">
                <span>✨ AI Memory Generator v3.0</span>
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
                    {isLoading ? "⏳ Generating..." : "🎯 Generate AI Memory"}
                  </button>
                </div>

                {generatedMessage && (
                  <div className="output-section">
                    <div className="output-window">
                      <div className="output-header">
                        📝 Your AI Memory {isGeneratingImage && "⏳ Creating image..."}
                      </div>

                      {generatedImageUrl && (
                        <div style={{ padding: "1rem", textAlign: "center", background: "#000" }}>
                          <img
                            src={generatedImageUrl || "/placeholder.svg"}
                            alt="Generated memory"
                            style={{
                              width: "100%",
                              maxWidth: "300px",
                              height: "auto",
                              border: "2px solid #333",
                              borderRadius: "8px",
                            }}
                          />
                          <div style={{ marginTop: "0.5rem", fontSize: "12px", color: "#00ff00" }}>
                            ✨ AI-Generated Memory Image
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