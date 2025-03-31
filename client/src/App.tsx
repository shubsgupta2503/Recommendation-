import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth";
import { Suspense, useState, useEffect } from "react";

// Import pages (non-lazy)
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/profile-page";
import SearchPage from "@/pages/search-page";
import ShoppingListsPage from "@/pages/shopping-lists-page";
import ProductDetailsPage from "@/pages/product-details-page";
import { useAuth } from "./hooks/use-auth";

// Loading component
const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Protected Route component
function ProtectedRouteWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/auth");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <ProtectedRouteWrapper>
          <HomePage />
        </ProtectedRouteWrapper>
      </Route>
      
      <Route path="/profile">
        <ProtectedRouteWrapper>
          <ProfilePage />
        </ProtectedRouteWrapper>
      </Route>
      
      <Route path="/search">
        <ProtectedRouteWrapper>
          <SearchPage />
        </ProtectedRouteWrapper>
      </Route>
      
      <Route path="/shopping-lists">
        <ProtectedRouteWrapper>
          <ShoppingListsPage />
        </ProtectedRouteWrapper>
      </Route>
      
      <Route path="/product/:id">
        {params => (
          <ProtectedRouteWrapper>
            <ProductDetailsPage />
          </ProtectedRouteWrapper>
        )}
      </Route>
      
      <Route path="/auth" component={AuthPage} />
      
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
