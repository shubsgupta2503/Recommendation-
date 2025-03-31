import { ShoppingListCard } from "@/components/shopping-list/list-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { data } from "@/data/mock-data";

export function ShoppingListsSection() {
  const [lists, setLists] = useState(data.shoppingLists);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-sans text-xl font-bold">My Shopping Lists</h2>
        <Button variant="default" className="text-sm px-4 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-lg flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Create New List
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lists.map((list, index) => (
          <ShoppingListCard key={index} list={list} />
        ))}
      </div>
    </section>
  );
}
