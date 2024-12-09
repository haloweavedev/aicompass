'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Send, User } from 'lucide-react';

interface ChatInterfaceProps {
  onComplete: (summary: any) => void;
}

export function ChatInterface({ onComplete }: ChatInterfaceProps) {
  const [isComplete, setIsComplete] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/expert/onboarding',
    onFinish: (message) => {
      // Check if AI indicates understanding is complete
      if (message.content.includes("UNDERSTANDING_COMPLETE:")) {
        setIsComplete(true);
        const summary = JSON.parse(
          message.content.split("UNDERSTANDING_COMPLETE:")[1]
        );
        onComplete(summary);
      }
    }
  });

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4 bg-white shadow-xl">
      <div className="flex flex-col h-[600px]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                } rounded-lg p-3`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSubmit}
          className="p-4 border-t border-gray-200"
        >
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Tell me about your expertise..."
              className="flex-1"
              rows={3}
            />
            <Button 
              type="submit" 
              disabled={isLoading || isComplete}
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}