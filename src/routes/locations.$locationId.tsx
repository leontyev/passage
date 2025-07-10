import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

// Define the shape of our data
interface LocationData {
  id: string;
  name: string;
  country: string;
  description: string;
  skiReport: string;
}

// The route component
export const Route = createFileRoute('/locations/$locationId')({
  component: LocationDetail,
});

// The data fetching function
async function fetchLocationData(locationId: string): Promise<LocationData> {
  const res = await fetch(`/api/locations/${locationId}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

function LocationDetail() {
  const { locationId } = Route.useParams();

  const { data, isLoading, isError } = useQuery<LocationData>({
    queryKey: ['location', locationId],
    queryFn: () => fetchLocationData(locationId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred.</div>;
  if (!data) return <div>No location data found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="mt-2 text-lg text-gray-700">{data.description}</p>
      <div className="mt-6">
        <p className="font-semibold text-gray-800">Ski Report:</p>
        <p className="text-gray-600">{data.skiReport}</p>
      </div>
    </div>
  );
}
