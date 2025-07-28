// src/mocks/handlers.ts

import { http, HttpResponse } from 'msw';

export interface LocationAnalytics {
  locationId: string;
  locationName: string;
  monthlyTemperature: number[]; // 12 months, Celsius
  monthlySunnyDays: number[]; // 12 months
  costOfLivingIndex: number; // Compared to a baseline
  internetSpeedMbs: number;
}

const analyticsData: LocationAnalytics[] = [
  {
    locationId: 'annecy',
    locationName: 'Annecy',
    monthlyTemperature: [-1, 1, 5, 9, 14, 18, 20, 19, 15, 10, 4, 0],
    monthlySunnyDays: [5, 7, 10, 12, 15, 18, 20, 18, 15, 11, 6, 4],
    costOfLivingIndex: 85.4,
    internetSpeedMbs: 750,
  },
  {
    locationId: 'trento',
    locationName: 'Trento',
    monthlyTemperature: [0, 2, 7, 11, 16, 20, 22, 21, 17, 12, 5, 1],
    monthlySunnyDays: [6, 8, 11, 13, 16, 19, 22, 20, 16, 12, 7, 5],
    costOfLivingIndex: 78.9,
    internetSpeedMbs: 680,
  },
  {
    locationId: 'lucerne',
    locationName: 'Lucerne',
    monthlyTemperature: [-2, -1, 3, 7, 12, 16, 18, 17, 13, 8, 2, -1],
    monthlySunnyDays: [3, 5, 8, 11, 13, 15, 17, 16, 13, 9, 4, 2],
    costOfLivingIndex: 115.2,
    internetSpeedMbs: 810,
  },
];

export const handlers = [
  http.get('/api/locations/annecy', () => {
    return HttpResponse.json({
      id: 'annecy',
      name: 'Annecy',
      country: 'France',
      description:
        'A beautiful town nestled by a crystal-clear lake, the jewel of the French Alps.',
      skiReport: '5cm of fresh powder expected at La Clusaz.',
    });
  }),
  http.get('/api/locations/trento', () => {
    return HttpResponse.json({
      id: 'trento',
      name: 'Trento',
      country: 'Italy',
      description:
        'A historic city nestled in the heart of the Dolomites, a paradise for cyclists.',
      skiReport: 'Excellent conditions for ski touring.',
    });
  }),
  http.get('/api/locations/lucerne', () => {
    return HttpResponse.json({
      id: 'lucerne',
      name: 'Lucerne',
      country: 'Switzerland',
      description:
        'A stunning city on a lake, surrounded by mountains, offering a blend of urban life and dramatic nature.',
      skiReport: 'Engelberg and Titlis are just a short train ride away.',
    });
  }),
  http.get('/api/analytics', () => {
    return HttpResponse.json(analyticsData);
  }),
];
