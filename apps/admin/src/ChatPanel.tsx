import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { askAI } from './lib/ai'
import type { ChatMessage } from './lib/ai'
import { ProfileCard, type Profile } from '@my/shared'
function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, pending])

  const canSend = input.trim().length > 0 && !pending

  async function send() {
    if (!canSend) return
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    }
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setError(null)
    setPending(true)
    try {
      const reply = await askAI(next)
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: reply },
      ])
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setPending(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    void send()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  return (
    <div style={{display :"flex", gap : 20}}>
    <main className="term" aria-labelledby="chat-title">
      <header className="term-bar">
        <span className="dot" aria-hidden="true" />
        <span className="dot" aria-hidden="true" />
        <span className="dot" aria-hidden="true" />
        <h1 id="chat-title" className="term-title">
          admin@ai: ~
        </h1>
      </header>

      <div className="term-body">
        <div role="log" aria-live="polite">
          {messages.map((m) =>
            m.role === 'user' ? (
              <p key={m.id} className="line">
                <span className="prompt">$ </span>
                <span className="cmd">{m.content}</span>
              </p>
            ) : (
              <p key={m.id} className="line out">
                {m.content}
              </p>
            ),
          )}
          {pending && (
            <p className="line out">
              thinking...
              <span className="cursor" aria-hidden="true">▍</span>
            </p>
          )}
          {error && (
            <p className="line error" role="alert">
              error: {error}
            </p>
          )}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <span className="prompt" aria-hidden="true">$&nbsp;</span>
          <label htmlFor="chat-input" className="chat-label">
            Message
          </label>
          <textarea
            id="chat-input"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter to send, Shift+Enter for new line"
          />
          <button type="submit" disabled={!canSend}>
            send
          </button>
        </form>
        <div ref={endRef} />
      </div>
    </main>
         <aside>
          <ProfileCard
            name={"stattic"}
            role={"stattic"}
            github={"stattic"}
          />
        </aside>
    </div>
  )
}

export default ChatPanel
