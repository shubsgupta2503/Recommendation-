import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { data } from "@/data/mock-data";
import { ExternalLink } from "lucide-react";

export function PriceComparisonTool() {
  return (
    <section className="mb-10">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-secondary/10 border-b">
          <h2 className="font-sans text-xl font-bold text-secondary">Price Comparison Tool</h2>
          <p className="text-sm text-gray-600">Find the best prices for specific items across different stores.</p>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="product-search" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <Input 
                type="text" 
                id="product-search"
                placeholder="e.g., Organic Milk, Cereal, etc." 
                className="w-full py-2 px-4 rounded-lg border border-gray-300"
              />
            </div>
            
            <div className="md:w-1/5">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Select defaultValue="current">
                <SelectTrigger className="w-full py-2 rounded-lg border border-gray-300">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Location</SelectItem>
                  <SelectItem value="90210">Beverly Hills, CA</SelectItem>
                  <SelectItem value="10001">New York, NY</SelectItem>
                  <SelectItem value="60601">Chicago, IL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:w-1/6 flex items-end">
              <Button className="w-full py-2 px-4 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg">
                Compare Prices
              </Button>
            </div>
          </div>
          
          {/* Sample Comparison Result */}
          <div className="border rounded-xl overflow-hidden">
            <div className="p-3 bg-gray-50 border-b flex items-center">
              <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80" alt="Organic Milk" className="w-12 h-12 object-cover rounded mr-3" />
              <div>
                <h3 className="font-semibold">Organic Whole Milk</h3>
                <p className="text-sm text-gray-600">1 gallon, pasteurized</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-sm text-gray-600">Price Range</div>
                <div className="font-bold">$3.49 - $5.99</div>
              </div>
            </div>
            
            <div className="divide-y">
              {data.priceComparison.map((store, index) => (
                <div key={index} className="p-3 flex items-center hover:bg-gray-50 transition cursor-pointer">
                  <img src={store.logo} alt={store.name} className="w-8 h-8 mr-3" />
                  <div>
                    <h4 className="font-semibold">{store.name}</h4>
                    <p className="text-xs text-gray-500">{store.distance} miles away</p>
                  </div>
                  <div className="ml-auto flex flex-col items-end">
                    <div className={`font-bold ${store.isLowest ? 'text-primary' : ''}`}>{store.price}</div>
                    <div className={`text-xs ${store.isLowest ? 'text-success' : 'text-gray-500'}`}>
                      {store.isLowest ? 'Lowest Price' : `+${store.difference} more`}
                    </div>
                  </div>
                  <button className="ml-4 p-2 text-secondary hover:text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-gray-50 border-t flex justify-between">
              <div>
                <span className="text-sm text-gray-600">Potential Savings</span>
                <span className="font-bold text-success ml-2">Up to $2.50</span>
              </div>
              <button className="text-sm text-secondary hover:text-secondary/80 font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Set Price Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
