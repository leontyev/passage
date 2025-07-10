import { http, HttpResponse } from 'msw';

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
];
