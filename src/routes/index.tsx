// src/routes/index.tsx

import { createFileRoute, Link } from '@tanstack/react-router';
import { LocationCard } from '../components/LocationCard';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="w-full p-8 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
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
      </div>
    </div>
  );
}
