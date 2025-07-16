// src/components/LocationAnalyticsCard.tsx

import { Sparkline } from './Sparkline';
import { type LocationAnalytics } from '../mocks/handlers'; // Move type to a types file later

interface LocationAnalyticsCardProps {
  data: LocationAnalytics;
}

export function LocationAnalyticsCard({ data }: LocationAnalyticsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-shadow hover:shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        {data.locationName}
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-700">
            Avg. Monthly Temp (°C)
          </h3>
          <div className="h-16 mt-2 text-blue-500">
            <Sparkline data={data.monthlyTemperature} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Sunny Days / Month</h3>
          <div className="h-16 mt-2 text-yellow-500">
            <Sparkline data={data.monthlySunnyDays} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Cost of Living</p>
            <p className="text-2xl font-semibold text-gray-900">
              {data.costOfLivingIndex}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Internet (Mbps)</p>
            <p className="text-2xl font-semibold text-gray-900">
              {data.internetSpeedMbs}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
