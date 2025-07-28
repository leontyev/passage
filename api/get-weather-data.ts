// api/get-weather-data.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const locations = {
  annecy: { lat: 45.9, lon: 6.13 },
  trento: { lat: 46.07, lon: 11.12 },
  lucerne: { lat: 47.05, lon: 8.3 },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { locationId } = req.query;

  if (
    typeof locationId !== 'string' ||
    !locations[locationId as keyof typeof locations]
  ) {
    return res.status(400).json({ error: 'Invalid location ID' });
  }

  const { lat, lon } = locations[locationId as keyof typeof locations];

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max`
  );
  const weatherData = await weatherResponse.json();

  res.status(200).json(weatherData);
}
