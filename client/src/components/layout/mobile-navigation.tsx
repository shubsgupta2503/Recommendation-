import { Link, useLocation } from "wouter";
import { Home, Search, List, User } from "lucide-react";

export function MobileNavigation() {
  const [location] = useLocation();

  if (location === "/auth") {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className={`flex flex-col items-center p-2 ${location === "/" ? "text-primary" : "text-gray-500"}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/search" className={`flex flex-col items-center p-2 ${location === "/search" ? "text-primary" : "text-gray-500"}`}>
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link href="/shopping-lists" className={`flex flex-col items-center p-2 ${location === "/shopping-lists" ? "text-primary" : "text-gray-500"}`}>
          <List className="h-5 w-5" />
          <span className="text-xs mt-1">Lists</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center p-2 ${location === "/profile" ? "text-primary" : "text-gray-500"}`}>
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </div>
  );
}
