import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { User, Mail, LogOut, ShoppingBag, Heart, Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutMutation.mutateAsync();
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
      setLocation("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.fullName) return "U";
    return user.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={""} alt={user?.fullName || 'User'} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl">{user?.fullName || user?.username}</CardTitle>
                <CardDescription className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                className="ml-auto hidden sm:flex" 
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </Button>
            </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    <User className="h-5 w-5 text-primary" />
                    <span>Personal Information</span>
                  </a>
                  <Separator />
                  <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <span>Order History</span>
                  </a>
                  <Separator />
                  <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Favorites</span>
                  </a>
                  <Separator />
                  <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Settings</span>
                  </a>
                  <Separator />
                  <button 
                    onClick={handleLogout} 
                    disabled={isLoggingOut}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors sm:hidden text-left"
                  >
                    <LogOut className="h-5 w-5 text-destructive" />
                    <span className="text-destructive">{isLoggingOut ? "Logging out..." : "Log Out"}</span>
                  </button>
                </nav>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Your shopping activity and price alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No recent activity found</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      <MobileNavigation />
    </div>
  );
}