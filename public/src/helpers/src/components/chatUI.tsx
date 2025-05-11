import { useChat } from 'ai/react'

export default function ChatUI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/n8n-adapter',
    stream: false
  });

  return (
    <div className="chat-box">
      {messages.map((m) => (
        <div key={m.id}>{m.role}: {m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
