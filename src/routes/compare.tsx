// src/routes/compare.tsx

import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { MultiLineChart } from '../components/MultiLineChart';
import { ComparisonBar } from '../components/ComparisonBar';
import { useAnalyticsData } from '../hooks/useAnalyticsData';

const locationColors = ['#3b82f6', '#f97316', '#14b8a6']; // Blue, Orange, Teal

export const Route = createFileRoute('/compare')({
  component: Compare,
});

function Compare() {
  const { data, isLoading, isError } = useAnalyticsData();

  const { tempDataSet, sunnyDataSet, maxCost, maxSpeed } = useMemo(() => {
    if (!data) return {};
    return {
      tempDataSet: data.map((d, i) => ({
        data: d.monthlyTemperature,
        color: locationColors[i],
        label: d.locationName,
      })),
      sunnyDataSet: data.map((d, i) => ({
        data: d.monthlySunnyDays,
        color: locationColors[i],
        label: d.locationName,
      })),
      maxCost: Math.max(...data.map((d) => d.costOfLivingIndex)),
      maxSpeed: Math.max(...data.map((d) => d.internetSpeedMbs)),
    };
  }, [data]);

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
        Direct comparison using superposition and scaled bars.
      </p>

      {/* --- LEGEND --- */}
      <div
        data-testid="location-legend"
        className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
      >
        {data?.map((d, i) => (
          <div key={d.locationId} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: locationColors[i] }}
            />
            <span className="font-semibold">{d.locationName}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- SUPERPOSED CHART 1: TEMPERATURE --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Avg. Monthly Temperature (°C)
          </h2>
          <div className="h-64">
            {tempDataSet && <MultiLineChart datasets={tempDataSet} />}
          </div>
        </div>

        {/* --- SUPERPOSED CHART 2: SUNNY DAYS --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sunny Days / Month
          </h2>
          <div className="h-64">
            {sunnyDataSet && <MultiLineChart datasets={sunnyDataSet} />}
          </div>
        </div>

        {/* --- SCALED BARS 1: COST OF LIVING --- */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Cost of Living Index
          </h2>
          {data?.map((d, i) => (
            <div key={d.locationId}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium text-gray-700">
                  {d.locationName}
                </span>
                <span className="font-bold text-gray-900">
                  {d.costOfLivingIndex}
                </span>
              </div>
              <ComparisonBar
                value={d.costOfLivingIndex}
                maxValue={maxCost!}
                barColor={locationColors[i]}
              />
            </div>
          ))}
        </div>

        {/* --- SCALED BARS 2: INTERNET SPEED --- */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Internet Speed (Mbps)
          </h2>
          {data?.map((d, i) => (
            <div key={d.locationId}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium text-gray-700">
                  {d.locationName}
                </span>
                <span className="font-bold text-gray-900">
                  {d.internetSpeedMbs}
                </span>
              </div>
              <ComparisonBar
                value={d.internetSpeedMbs}
                maxValue={maxSpeed!}
                barColor={locationColors[i]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
