// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ExpertOnboarding } from './components/expert-onboarding';
import { UserButton } from '@clerk/nextjs';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome, {user?.firstName}
        </h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="max-w-3xl">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Complete Your Expert Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Let&apos;s understand your expertise better to match you with the right opportunities.
          </p>
          <Button 
            onClick={() => setShowOnboarding(true)} 
            variant="default"
            className="bg-primary hover:bg-primary/90"
          >
            Start Expert Persona Setup
          </Button>
        </div>
      </div>

      {/* Expert Onboarding Modal */}
      {showOnboarding && <ExpertOnboarding />}
    </div>
  );
}