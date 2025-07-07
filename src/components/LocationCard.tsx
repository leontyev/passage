interface LocationCardProps {
  name: string;
  country: string;
  imageUrl: string;
}

export function LocationCard({ name, country, imageUrl }: LocationCardProps) {
  return (
    // We'll steal the "Sandro" dashboard's card style
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {/* The Image */}
      <img
        className="w-full h-56 object-cover"
        src={imageUrl}
        alt={`View of ${name}`}
      />

      {/* The Content Area with generous padding */}
      <div className="p-6">
        {/* The Title - bold, large, dark gray */}
        <div className="font-semibold text-2xl mb-1 text-gray-800">{name}</div>

        {/* The Subtitle - lighter gray, normal weight */}
        <p className="text-gray-600 text-base">{country}</p>

        {/* We can add a placeholder for future info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">More details to come...</p>
        </div>
      </div>
    </div>
  );
}
