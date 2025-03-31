import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Store, 
  ChevronLeft, 
  LineChart,
  ArrowDown,
  InfoIcon, 
  Bell 
} from "lucide-react";
import { Link, useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Product, Price } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id || "1"; // Default to 1 if no ID is provided
  const productId = parseInt(id);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState("1");
  
  // Fetch product details
  const { data: product, isLoading: isLoadingProduct } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    },
    enabled: !isNaN(productId),
  });
  
  // Fetch price comparisons
  const { data: prices, isLoading: isLoadingPrices } = useQuery<Price[]>({
    queryKey: ["/api/prices/product", productId],
    queryFn: async () => {
      const response = await fetch(`/api/prices/product/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      return response.json();
    },
    enabled: !isNaN(productId),
  });

  if (isNaN(productId)) {
    return <div>Invalid product ID</div>;
  }

  const handleAddToList = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your shopping list",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to shopping list",
      description: `${product?.name} has been added to your shopping list`,
    });
  };

  const handleToggleFavorite = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your favorites",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to favorites",
      description: `${product?.name} has been added to your favorites`,
    });
  };

  const handleSetPriceAlert = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to set price alerts",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Price alert set",
      description: "You will be notified when the price drops",
    });
  };

  // Get the lowest price from all sources
  const lowestPrice = prices && prices.length > 0 
    ? prices.reduce((min, price) => 
        parseFloat(price.price) < min ? parseFloat(price.price) : min, 
        parseFloat(prices[0].price)
      )
    : 0;

  // Find if any store has this product on sale
  const onSale = prices && prices.length > 0 ? prices.some(price => price.onSale) : false;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => setLocation("/")}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to products
          </Button>

          {isLoadingProduct ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-10 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <div className="pt-4 flex gap-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg overflow-hidden border">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain aspect-square"
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-gray-50">
                    <p className="text-muted-foreground text-center">No image available</p>
                  </div>
                )}
              </div>
              
              <div>
                <div className="mb-2">
                  <Badge variant="outline" className="text-sm mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-2xl font-bold">{product.name}</h1>
                  {product.brand && (
                    <p className="text-muted-foreground">by {product.brand}</p>
                  )}
                </div>
                
                <div className="flex items-center mt-4 mb-2">
                  {isLoadingPrices ? (
                    <Skeleton className="h-8 w-32" />
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        ₹{lowestPrice?.toFixed(2) || "N/A"}
                      </span>
                      {onSale && (
                        <span className="text-sm line-through text-muted-foreground">
                          ₹{(lowestPrice * 1.2).toFixed(2)}
                        </span>
                      )}
                      {onSale && (
                        <Badge className="ml-2 bg-red-500">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          20% OFF
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <InfoIcon className="h-4 w-4" />
                  <span>Price compared from multiple stores</span>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {product.description || "No description available for this product."}
                </p>
                
                <div className="flex gap-2 mb-6">
                  <div className="w-1/3">
                    <Select value={quantity} onValueChange={setQuantity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="flex-1" onClick={handleAddToList}>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Shopping List
                  </Button>
                  
                  <Button variant="outline" size="icon" onClick={handleToggleFavorite}>
                    <Heart className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full" onClick={handleSetPriceAlert}>
                  <Bell className="h-4 w-4 mr-2" /> 
                  Set Price Alert
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Product not found</h3>
              <p className="text-muted-foreground mt-1">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Button className="mt-4" onClick={() => setLocation("/")}>
                Back to Homepage
              </Button>
            </div>
          )}

          {product && (
            <div className="mt-8">
              <Tabs defaultValue="price-comparison">
                <TabsList className="w-full">
                  <TabsTrigger value="price-comparison" className="flex-1">
                    Price Comparison
                  </TabsTrigger>
                  <TabsTrigger value="price-history" className="flex-1">
                    Price History
                  </TabsTrigger>
                  <TabsTrigger value="related" className="flex-1">
                    Related Products
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="price-comparison" className="mt-4">
                  {isLoadingPrices ? (
                    <div className="space-y-4">
                      {Array(4).fill(0).map((_, i) => (
                        <Card key={i}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-5 w-40" />
                              </div>
                              <div className="text-right">
                                <Skeleton className="h-6 w-20 mb-1" />
                                <Skeleton className="h-4 w-16" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : prices && prices.length > 0 ? (
                    <div className="space-y-4">
                      {prices.map((price) => (
                        <Card key={price.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                  <Store className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-medium">Store {price.storeId}</p>
                                  <p className="text-sm text-muted-foreground">Updated today</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-baseline gap-2">
                                  <span className="font-semibold">₹{parseFloat(price.price).toFixed(2)}</span>
                                  {price.onSale && (
                                    <span className="text-xs line-through text-muted-foreground">
                                      ₹{price.salePrice}
                                    </span>
                                  )}
                                </div>
                                <Button variant="link" className="h-auto p-0 text-sm">
                                  Visit Store
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No price data available</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="price-history" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Price History</CardTitle>
                      <CardDescription>See how prices have changed over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <LineChart className="h-12 w-12 mx-auto" />
                        <p className="mt-2">Price history charts will be available soon</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="related" className="mt-4">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No related products available</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <MobileNavigation />
    </div>
  );
}