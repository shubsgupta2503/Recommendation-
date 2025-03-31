import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/ui/price-tag";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    badge: {
      text: string;
      type: "sale" | "best-price" | "trending";
    };
    price: string;
    stores: {
      name: string;
      logo: string;
      price: string;
      originalPrice?: string;
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      description: !isFavorite ? `${product.name} has been added to your favorites.` : `${product.name} has been removed from your favorites.`,
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "bg-accent";
      case "best-price":
        return "bg-primary";
      case "trending":
        return "bg-secondary";
      default:
        return "bg-gray-500";
    }
  };

  const getPriceTagVariant = () => {
    switch (product.badge.type) {
      case "sale":
        return "accent";
      case "best-price":
        return "primary";
      case "trending":
        return "secondary";
      default:
        return "primary";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 object-cover"
        />
        <span className={`absolute top-3 right-3 ${getBadgeColor(product.badge.type)} text-white text-xs font-bold px-2 py-1 rounded`}>
          {product.badge.text}
        </span>
        <button 
          onClick={handleFavoriteToggle}
          className={`absolute top-3 left-3 bg-white p-2 rounded-full ${isFavorite ? 'text-accent' : 'text-gray-400 hover:text-accent'} transition shadow-sm`}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
          <PriceTag price={product.price} variant={getPriceTagVariant()} />
        </div>
        
        <div className="mb-3">
          {product.stores.map((store, index) => (
            <div key={index} className="flex items-center text-sm mb-1">
              <img src={store.logo} alt={store.name} className="h-4 w-4 mr-2" />
              <span className="text-gray-700">{store.name}</span>
              <span className={`ml-auto font-semibold ${store.originalPrice ? 'line-through text-gray-500' : ''}`}>
                {store.price}
              </span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
