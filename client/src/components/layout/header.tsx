import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Heart, ShoppingCart, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!user && location === "/auth") {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-primary text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              <h1 className="font-sans font-bold text-xl text-primary">PriceBasket</h1>
            </div>
          </Link>
          
          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for grocery items..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary hidden md:block">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-primary">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-gray-700 hover:text-primary relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
            <div className="hidden md:block h-8 border-r border-gray-300 mx-1"></div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-primary focus:outline-none">
                <span className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center">
                  <User className="h-4 w-4" />
                </span>
                <span className="hidden md:inline font-semibold">Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hidden md:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">My Lists</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for grocery items..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
