// src/routes/index.tsx

import { createFileRoute, Link } from '@tanstack/react-router';
import { LocationCard } from '../components/LocationCard';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="w-full p-8 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        <Link to="/locations/$locationId" params={{ locationId: 'annecy' }}>
          <LocationCard
            name="Annecy"
            country="France"
            imageUrl="/annecy-view.jpg"
          />
        </Link>
        <Link to="/locations/$locationId" params={{ locationId: 'trento' }}>
          <LocationCard
            name="Trento"
            country="Italy"
            imageUrl="/trento-view.jpg"
          />
        </Link>
        <Link to="/locations/$locationId" params={{ locationId: 'lucerne' }}>
          <LocationCard
            name="Lucerne"
            country="Switzerland"
            imageUrl="/lucerne-view.jpg"
          />
        </Link>
      </div>
    </div>
  );
}
