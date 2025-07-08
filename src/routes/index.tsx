import { createFileRoute } from '@tanstack/react-router';
import { LocationCard } from '../components/LocationCard';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-8">
      <LocationCard
        name="Annecy"
        country="France"
        imageUrl="/annecy-view.jpg" // Make sure you have this image in /public
      />
    </div>
  );
}
