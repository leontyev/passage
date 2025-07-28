// src/routes/locations.$locationId.tsx

import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface LocationData {
  id: string;
  name: string;
  country: string;
  description: string;
  skiReport: string;
}

async function fetchLocationData(locationId: string): Promise<LocationData> {
  const res = await fetch(`/api/location?id=${locationId}`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

async function generateDescription(
  locationName: string
): Promise<{ description: string }> {
  const res = await fetch('/api/generate-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ locationName }),
  });
  if (!res.ok) throw new Error('Failed to generate description from server');
  return res.json();
}

export const Route = createFileRoute('/locations/$locationId')({
  component: LocationDetail,
});

function LocationDetail() {
  const { locationId } = Route.useParams();
  const [isEnhanced, setIsEnhanced] = useState(false);

  const { data, isLoading, isError } = useQuery<LocationData>({
    queryKey: ['location', locationId],
    queryFn: () => fetchLocationData(locationId),
  });

  const descriptionMutation = useMutation({
    mutationFn: generateDescription,
    onSuccess: () => {
      setIsEnhanced(true);
    },
  });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError) return <div className="p-8">An error occurred.</div>;
  if (!data) return <div className="p-8">No location data found.</div>;

  const handleUndo = () => {
    setIsEnhanced(false);
  };

  const displayDescription =
    isEnhanced && descriptionMutation.data
      ? descriptionMutation.data.description
      : data.description;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>

      <div className="mt-4 relative group">
        <p
          className={`text-xl text-gray-700 transition-opacity duration-500 ${descriptionMutation.isPending ? 'opacity-50 animate-pulse' : 'opacity-100'}`}
        >
          {displayDescription}
        </p>

        <button
          onClick={() => descriptionMutation.mutate(data.name)}
          disabled={descriptionMutation.isPending}
          className="absolute -top-2 -right-2 p-1 bg-white border rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          title="Enhance with AI"
        >
          ✨
        </button>
      </div>

      {isEnhanced && (
        <button
          onClick={handleUndo}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Revert to original
        </button>
      )}

      <div className="mt-6 p-4 bg-slate-100 rounded-lg shadow-inner">
        <p className="font-semibold text-gray-800">Ski Report:</p>
        <p className="text-gray-600">{data.skiReport}</p>
      </div>

      {descriptionMutation.isError && (
        <p className="mt-4 text-red-600">
          AI assistant is unavailable right now.
        </p>
      )}
    </div>
  );
}
