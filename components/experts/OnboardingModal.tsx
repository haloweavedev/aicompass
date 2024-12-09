'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatInterface } from "./ChatInterface";
import { useState } from "react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (expertData: any) => void;
}

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [isOnboarding, setIsOnboarding] = useState(true);

  const handleComplete = async (summary: any) => {
    setIsOnboarding(false);
    onComplete(summary);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Expert Profile Creation</DialogTitle>
          <DialogDescription>
            Let's understand your expertise through a conversation. Be detailed in your responses
            for better understanding.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ChatInterface onComplete={handleComplete} />
        </div>
      </DialogContent>
    </Dialog>
  );
}