// app/expert/onboarding/chat.tsx
'use client'

import { useChat } from 'ai/react'

const INITIAL_MESSAGE = {
  id: 'initial-message',
  role: 'assistant' as const,
  content: "Hello! I'm here to understand your expertise and create your AI-powered profile. Could you start by telling me about your background and current work?"
}

export function ExpertChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/expert/chat',
    initialMessages: [INITIAL_MESSAGE]
  })

  return (
    <div className="max-w-3xl w-full mx-auto px-4">
      <div className="bg-white rounded-3xl p-12 shadow-lg">
        <div className="space-y-6">
          {/* AI Message */}
          <h2 className="text-3xl font-normal text-gray-800">
            {messages[messages.length - 1]?.content}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Type your response..."
              className="w-full p-4 min-h-[100px] text-xl border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-gray-500">
                Press Enter to send
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !input}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 flex items-center gap-2"
              >
                {isLoading ? 'Thinking...' : 'Continue'} →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}