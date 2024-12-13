// app/expert/onboarding/chat.tsx
'use client'

import { useChat } from 'ai/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
  const [profileSlug, setProfileSlug] = useState<string | null>(null)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/expert/chat',
    initialMessages: [INITIAL_MESSAGE],
    onFinish: async (message) => {
      // Wait a bit to ensure profile is updated
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check completion status
      const response = await fetch('/api/expert/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, message] })
      })
      
      if (response.headers.get('X-Chat-Complete') === 'true') {
        const profileSlug = response.headers.get('X-Profile-Slug')
        console.log('Completed with slug:', profileSlug)
        setProfileSlug(profileSlug)
        setIsComplete(true)
      }
    }
  })

  // Show completion state
  if (isComplete) {
    return (
      <Card className="max-w-3xl w-full mx-auto p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Profile Created Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your expert profile has been generated and is ready to view.
        </p>
        <div className="flex gap-4 justify-center">
          {profileSlug && (
            <Button 
              onClick={() => router.push(`/expert/${profileSlug}`)}
              className="bg-primary"
            >
              View Profile
            </Button>
          )}
          <Button 
            onClick={() => router.push('/dashboard')}
            variant="outline"
          >
            Go to Dashboard
          </Button>
        </div>
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
                <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
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