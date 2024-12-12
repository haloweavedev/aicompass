// app/expert/onboarding/chat.tsx
'use client'

import { useChat } from 'ai/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const INITIAL_MESSAGE = {
  id: 'initial-message',
  role: 'assistant' as const,
  content: "Hello! I'm here to understand your expertise and create your AI-powered profile. Could you start by telling me about your background and current work?"
}

export function ExpertChat() {
  const router = useRouter()
  const [isComplete, setIsComplete] = useState(false)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/expert/chat',
    initialMessages: [INITIAL_MESSAGE],
    onFinish: async (message) => {
      // Check response headers for completion status
      const response = await fetch('/api/expert/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, message] })
      })
      
      if (response.headers.get('X-Chat-Complete') === 'true') {
        setIsComplete(true)
        // Wait a bit to show completion state before redirect
        setTimeout(() => router.push('/dashboard'), 3000)
      }
    }
  })

  // Show completion state
  if (isComplete) {
    return (
      <Card className="max-w-3xl w-full mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Profile Created Successfully!</h2>
        <p className="text-gray-600 mb-4">
          Your expert profile has been generated. Redirecting to dashboard...
        </p>
        <Button 
          onClick={() => router.push('/dashboard')}
          className="mt-4"
        >
          Go to Dashboard
        </Button>
      </Card>
    )
  }

  return (
    <div className="max-w-3xl w-full mx-auto px-4">
      <Card className="bg-white rounded-3xl p-12 shadow-lg">
        <div className="space-y-6">
          {/* Show all messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.role === 'assistant' 
                    ? 'bg-gray-100' 
                    : 'bg-blue-50'
                }`}
              >
                <p className="text-gray-800">{message.content}</p>
              </div>
            ))}
          </div>

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
              
              <Button
                type="submit"
                disabled={isLoading || !input}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 flex items-center gap-2"
              >
                {isLoading ? 'Thinking...' : 'Continue'} →
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}