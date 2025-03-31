import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Share2 } from "lucide-react";

interface ListItem {
  name: string;
  price: string;
  completed: boolean;
}

interface ShoppingList {
  id: number;
  name: string;
  itemCount: number;
  lastUpdated: string;
  items: ListItem[];
  total: string;
}

interface ShoppingListCardProps {
  list: ShoppingList;
}

export function ShoppingListCard({ list }: ShoppingListCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{list.name}</h3>
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-secondary">
              <Pencil className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-red-500">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500">{list.itemCount} items • Last updated {list.lastUpdated}</p>
      </div>
      <ul className="divide-y">
        {list.items.slice(0, 3).map((item, index) => (
          <li key={index} className="flex items-center p-3">
            {item.completed ? (
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            ) : (
              <span className="w-6 h-6 border-2 border-gray-300 rounded-full mr-3"></span>
            )}
            <span>{item.name}</span>
            <span className="ml-auto text-sm font-semibold">{item.price}</span>
          </li>
        ))}
      </ul>
      <div className="p-3 bg-gray-50 flex justify-between items-center">
        <span className="text-sm text-gray-600">Total ({list.itemCount} items)</span>
        <span className="font-bold">{list.total}</span>
      </div>
      <div className="p-3 flex space-x-2">
        <Button className="flex-1 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg text-sm">
          Optimize Prices
        </Button>
        <Button variant="outline" className="py-2 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg text-sm flex items-center">
          <Share2 className="h-4 w-4 mr-1" /> Share
        </Button>
      </div>
    </div>
  );
}
