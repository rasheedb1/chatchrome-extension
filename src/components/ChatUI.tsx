import { useChat } from 'ai/react'
import { useState } from 'react'
import DynamicActions from './DynamicActions'
import { ActionItem } from '../types'

export default function ChatUI() {
  // Estado local para las acciones UI
  const [ui, setUi] = useState<ActionItem[]>([]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/n8n-adapter',
    stream: false,
    onFinish: (message, { data }) => {
      if (data?.ui) {
        setUi(data.ui);
      } else {
        setUi([]);
      }
    }
  });

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Actions - ahora usando el estado local ui */}
      <DynamicActions ui={ui} />

      {/* Input form */}
      <form 
        onSubmit={handleSubmit}
        className="flex gap-2 border-t pt-4 mt-4"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}
