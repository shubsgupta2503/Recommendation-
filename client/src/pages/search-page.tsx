import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // This would typically fetch from the API with proper search parameters
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  const filteredProducts = products?.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToShoppingList = (productId: number) => {
    toast({
      title: "Added to shopping list",
      description: "The product has been added to your shopping list",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Search Products</h1>
          
          <div className="flex gap-2 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products, brands, categories..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="mb-4">
            <ScrollArea className="whitespace-nowrap pb-2">
              <div className="flex gap-2">
                {["All", "Grocery", "Dairy", "Vegetables", "Fruits", "Snacks", "Beverages", "Spices", "Household"].map((category) => (
                  <Badge 
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      // Filter by category would go here
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-24 w-24 rounded-md" />
                      <div className="flex-grow space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-1/2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="h-24 w-24 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-muted-foreground text-xs text-center p-2">No image</span>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold text-lg">₹150.00</span>
                          <Button size="sm" variant="outline" onClick={() => addToShoppingList(product.id)}>
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching "{searchTerm}"</p>
              <p className="text-sm mt-2">Try searching for different products or brands</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Start searching to find products</p>
              <p className="text-sm mt-2">Use the search bar above to find products by name, brand, or category</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <MobileNavigation />
    </div>
  );
}