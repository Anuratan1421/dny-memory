"use client"

import { useState } from "react"
import "./App.css"

export default function CollegeMemories() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

But this not first time Back in school, after 10th or 12th, the goodbyes felt just as permanent. You swore those were the most special bonds you'd ever make. You wrote farewell notes and cried over slam books, believing nothing would ever replace your school friends. You thought no friendship could come close.

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
    const storyText =
      "Last Bell Ring Again... A beautiful story about college memories and friendships that last forever."
    const url = window.location.href

    // Try native sharing first, with fallback options
    if (navigator.share) {
      navigator
        .share({
          title: "Last Bell Ring Again - College Memories",
          text: storyText,
          url: url,
        })
        .catch((error) => {
          console.log("Native sharing failed, using fallback")
          copyToClipboard(storyText + "\n\n" + url)
        })
    } else {
      // Fallback: copy to clipboard
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
          // Fallback for older browsers
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

  const shareToInstagram = () => {
    const text = encodeURIComponent("Check out this beautiful story about college memories! 📚✨")
    // Open Instagram in new tab - user can manually share
    window.open("https://www.instagram.com/", "_blank")
    // Also copy text to clipboard for easy sharing
    copyToClipboard(
      "Last Bell Ring Again... A beautiful story about college memories and friendships that last forever.\n\n" +
        window.location.href,
    )
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(
      "Last Bell Ring Again... A beautiful story about college memories and friendships 📚✨ #CollegeMemories #Friendship",
    )
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
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

      if (!response.ok) {
        throw new Error("Failed to generate message")
      }

      const data = await response.json()
      setGeneratedMessage(data.message)
    } catch (error) {
      console.error("Error generating message:", error)
      alert("Error generating message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const shareGeneratedMessage = () => {
    if (generatedMessage) {
      const shareText = `${generatedMessage}\n\n#EngineeringMemories #CollegeLife #Graduation`

      // Try native sharing first
      if (navigator.share) {
        navigator
          .share({
            title: "My Engineering Journey",
            text: shareText,
          })
          .catch((error) => {
            console.log("Native sharing failed, using clipboard fallback")
            copyToClipboard(shareText)
          })
      } else {
        // Fallback: copy to clipboard
        copyToClipboard(shareText)
      }
    }
  }

  const shareGeneratedToInstagram = () => {
    if (generatedMessage) {
      const shareText = `${generatedMessage}\n\n#EngineeringMemories #CollegeLife #Graduation`
      copyToClipboard(shareText)
      // Open Instagram
      window.open("https://www.instagram.com/", "_blank")
    }
  }

  const shareGeneratedToTwitter = () => {
    if (generatedMessage) {
      const text = encodeURIComponent(`${generatedMessage}\n\n#EngineeringMemories #CollegeLife #Graduation`)
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>College Memories</h1>
        <p>A journey through friendship, growth, and goodbyes</p>
      </header>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-content">
          <div className="story-text">
            {story.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="share-buttons">
            <button onClick={shareStory} className="share-btn">
              📱 Share Story
            </button>
            <button onClick={shareToInstagram} className="share-btn instagram-btn">
              📸 Instagram
            </button>
            <button onClick={shareToTwitter} className="share-btn twitter-btn">
              🐦 Twitter
            </button>
            <button onClick={shareToFacebook} className="share-btn facebook-btn">
              📘 Facebook
            </button>
          </div>
        </div>
      </section>

      {/* Message Generator Section */}
      <section className="generator-section">
        <div className="generator-content">
          <h2>Create Your Engineering Journey Message</h2>
          <p>Share your name and a memory, and we'll create a beautiful message about your engineering journey</p>

          <div className="input-form">
            <div className="input-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">Your Memory or Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a memory from your engineering journey..."
                rows="4"
              />
            </div>

            <button onClick={generatePersonalMessage} className="generate-btn" disabled={isLoading}>
              {isLoading ? "✨ Creating Magic..." : "✨ Generate My Message"}
            </button>
          </div>

          {generatedMessage && (
            <div className="generated-message">
              <h3>Your Personalized Message</h3>
              <div className="message-content">
                <p>{generatedMessage}</p>
              </div>
              <div className="share-options">
                <button onClick={shareGeneratedMessage} className="share-generated-btn">
                  📱 Share Message
                </button>
                <button onClick={shareGeneratedToInstagram} className="share-generated-btn instagram-btn">
                  📸 Instagram Story
                </button>
                <button onClick={shareGeneratedToTwitter} className="share-generated-btn twitter-btn">
                  🐦 Twitter
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ for all the engineering graduates</p>
      </footer>
    </div>
  )
}
