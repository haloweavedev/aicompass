export interface Expert {
    id: string;
    userId: string;
    userName: string;
    name: string;
    email: string;
    expertise: string;
    understanding: ExpertUnderstanding;
    summary: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ExpertUnderstanding {
    areas: string[];
    skills: string[];
    industries: string[];
    experience: string;
    methodologies: string[];
  }
  
  export interface ExpertOnboarding {
    id: string;
    expertId: string;
    questions: OnboardingQuestion[];
    answers: OnboardingAnswer[];
    score: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface OnboardingQuestion {
    id: string;
    question: string;
    context?: string;
    timestamp: Date;
  }
  
  export interface OnboardingAnswer {
    id: string;
    questionId: string;
    answer: string;
    timestamp: Date;
  }