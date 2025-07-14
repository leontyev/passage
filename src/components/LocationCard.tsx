// src/components/LocationCard.tsx

interface LocationCardProps {
  name: string;
  country: string;
  imageUrl: string;
}

export function LocationCard({ name, country, imageUrl }: LocationCardProps) {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <img
        className="w-full h-56 object-cover"
        src={imageUrl}
        alt={`View of ${name}`}
      />

      <div className="p-6">
        <div className="font-semibold text-2xl mb-1 text-gray-800">{name}</div>

        <p className="text-gray-600 text-base">{country}</p>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">More details to come...</p>
        </div>
      </div>
    </div>
  );
}
