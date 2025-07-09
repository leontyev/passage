import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept the GET request to our fake API
  http.get('/api/locations/annecy', () => {
    // Respond with a simple, hardcoded JSON object
    return HttpResponse.json({
      id: 'annecy',
      name: 'Annecy',
      country: 'France',
      description:
        'A beautiful town nestled by a crystal-clear lake, the jewel of the French Alps.',
      skiReport: '5cm of fresh powder expected at La Clusaz.',
    });
  }),
];
