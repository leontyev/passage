// api/analytics.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

const analyticsData = [
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

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json(analyticsData);
}
