import { createFileRoute, Link } from '@tanstack/react-router';
import { LocationCard } from '../components/LocationCard';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-8 gap-8">
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
  );
}
