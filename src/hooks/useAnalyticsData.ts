// src/hooks/useAnalyticsData.ts
import { useQuery } from '@tanstack/react-query';
import { type LocationAnalytics } from '../mocks/handlers';

// This is the key! The function decides where to get the data.
async function fetchAnalytics(): Promise<LocationAnalytics[]> {
  const endpoint = import.meta.env.PROD
    ? '/api/get-real-analytics' // A future real endpoint
    : '/api/analytics'; // Our current MSW mock endpoint

  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export function useAnalyticsData() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });
}
