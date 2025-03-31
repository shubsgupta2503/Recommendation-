import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="rounded-xl overflow-hidden mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=400&q=80" 
        alt="Grocery shopping" 
        className="object-cover w-full h-48 md:h-72"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-10">
        <h2 className="font-sans text-white text-2xl md:text-4xl font-bold mb-2">Save On Your Grocery Bill</h2>
        <p className="text-white text-sm md:text-lg mb-4 max-w-lg">Compare prices across multiple stores and find the best deals on your favorite grocery items.</p>
        <div className="flex space-x-4">
          <Button className="bg-white text-primary hover:bg-gray-100 font-bold py-2 px-6 rounded-full shadow-lg">
            Start Saving
          </Button>
          <Button variant="outline" className="bg-transparent text-white border border-white hover:bg-white/10 font-bold py-2 px-6 rounded-full">
            How It Works
          </Button>
        </div>
      </div>
    </section>
  );
}
