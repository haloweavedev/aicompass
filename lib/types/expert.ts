// lib/types/expert.ts
export interface Message {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export interface ExpertPersona {
    messages: Message[];
    understandingScore: number;
    emulatePersonality: boolean;
  }