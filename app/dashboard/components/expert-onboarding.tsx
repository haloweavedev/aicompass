// app/dashboard/components/expert-onboarding.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { type Message } from '@/lib/types/expert';

export function ExpertOnboarding() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [understandingScore, setUnderstandingScore] = useState(0);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hey, can you tell me your name and a little of what you do so I can fully understand your expertise?"
  }]);

  const handleContinue = async () => {
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      
      // Add user message
      const newMessages: Message[] = [
        ...messages,
        { role: 'user', content: input.trim() }
      ];
      setMessages(newMessages);
      setInput('');

      // Get AI response
      const response = await fetch('/api/expert-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      setMessages(messages => [...messages, ...data.messages]);
      setUnderstandingScore(data.understandingScore);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto h-full flex items-center p-4">
        <Card className="w-full p-8 shadow-lg bg-white/80 backdrop-blur-sm">
          {/* Understanding Score */}
          <div className="mb-6">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${understandingScore}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Understanding: {Math.round(understandingScore)}%
            </p>
          </div>

          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`
                  ${msg.role === 'assistant' 
                    ? 'font-medium' 
                    : 'bg-gray-50 p-4 rounded-lg'}
                  animate-fade-in
                `}
              >
                {msg.content}
              </div>
            ))}
            
            {messages[messages.length - 1]?.role === 'assistant' && (
              <div className="space-y-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-32 p-4 rounded-lg border focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your response..."
                  disabled={isLoading}
                />
                
                {input.trim() && (
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Press Shift+Tab to go back
                    </div>
                    <Button 
                      onClick={handleContinue}
                      disabled={isLoading}
                      className="bg-gray-900 text-white"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}