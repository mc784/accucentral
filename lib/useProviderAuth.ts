'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getProviderId, getProviderName, getProviderPhone } from './auth';

export const useProviderAuth = () => {
  const router = useRouter();
  const [providerId, setProviderId] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string | null>(null);
  const [providerPhone, setProviderPhone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/provider/login');
    } else {
      setProviderId(getProviderId());
      setProviderName(getProviderName());
      setProviderPhone(getProviderPhone());
    }
    setIsLoading(false);
  }, [router]);

  return {
    providerId,
    providerName,
    providerPhone,
    isLoading,
    isAuthenticated: !isLoading && providerId !== null,
  };
};
