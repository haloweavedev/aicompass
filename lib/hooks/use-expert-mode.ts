import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function useExpertMode() {
  const { user } = useUser();
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMode = async () => {
      if (!user) return;
      // Fetch from your API
      setIsLoading(false);
    };
    fetchMode();
  }, [user]);

  return { isExpertMode, setIsExpertMode, isLoading };
}