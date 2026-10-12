export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

/**
 * Returns the assistant's reply for the given conversation.
 *
 * The default implementation is a mock: it needs no API key and no backend.
 * To use a real model, replace the body with a call to your server, e.g.
 * an endpoint in apps/api that holds the API key:
 *
 *   const res = await fetch('/api/chat', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ messages }),
 *   })
 *   if (!res.ok) throw new Error('Request failed')
 *   return (await res.json()).reply as string
 *
 * Keep secrets on the server, never in this bundle.
 */
export async function askAI(messages: ChatMessage[]): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const last = [...messages].reverse().find((m) => m.role === 'user')
  if (!last) return 'Hi! Ask me anything.'

  return `This is a mock reply. You said: "${last.content}"`
}
