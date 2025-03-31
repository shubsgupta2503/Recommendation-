import { ProductCard } from "@/components/products/product-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { data } from "@/data/mock-data";

export function BestDealsSection() {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-sans text-xl font-bold">Today's Best Deals</h2>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.bestDeals.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
