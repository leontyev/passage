// api/location.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

const locationsData = {
  annecy: {
    id: 'annecy',
    name: 'Annecy',
    country: 'France',
    description:
      'A beautiful town nestled by a crystal-clear lake, the jewel of the French Alps.',
    skiReport: '5cm of fresh powder expected at La Clusaz.',
  },
  trento: {
    id: 'trento',
    name: 'Trento',
    country: 'Italy',
    description:
      'A historic city nestled in the heart of the Dolomites, a paradise for cyclists.',
    skiReport: 'Excellent conditions for ski touring.',
  },
  lucerne: {
    id: 'lucerne',
    name: 'Lucerne',
    country: 'Switzerland',
    description: 'A stunning city on a lake, surrounded by mountains.',
    skiReport: 'Engelberg is just a short train ride away.',
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (
    typeof id === 'string' &&
    locationsData[id as keyof typeof locationsData]
  ) {
    const location = locationsData[id as keyof typeof locationsData];
    return res.status(200).json(location);
  }

  return res.status(404).json({ error: 'Location not found' });
}
