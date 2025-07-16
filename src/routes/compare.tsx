// src/routes/compare.tsx

import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { type LocationAnalytics } from '../mocks/handlers'; // Note: Move this to a dedicated types file in a real app
import { LocationAnalyticsCard } from '../components/LocationAnalyticsCard'; // <-- IMPORT THE CARD

async function fetchAnalytics(): Promise<LocationAnalytics[]> {
  const res = await fetch('/api/analytics');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export const Route = createFileRoute('/compare')({
  component: Compare,
});

function Compare() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading)
    return <div className="p-8 text-center">Loading comparison data...</div>;
  if (isError)
    return (
      <div className="p-8 text-center text-red-600">An error occurred.</div>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Location Comparison
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        An information-dense view inspired by Edward Tufte's "small multiples".
      </p>

      {/* The container for our small multiples grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data?.map((locationData) => (
          <LocationAnalyticsCard
            key={locationData.locationId}
            data={locationData}
          />
        ))}
      </div>
    </div>
  );
}
