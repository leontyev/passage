import { LocationCard } from './components/LocationCard';

function App() {
  return (
    // Use a light gray background to make the white card pop
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-8">
      <LocationCard
        name="Annecy"
        country="France"
        imageUrl="/annecy-view.jpg" // Make sure you have this image in /public
      />
    </div>
  );
}

export default App;
