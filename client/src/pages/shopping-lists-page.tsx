import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Plus, MoreVertical, Trash, PenLine, Check, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ShoppingList, ListItem } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShoppingListsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newListName, setNewListName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch all user's shopping lists
  const { data: shoppingLists, isLoading } = useQuery<ShoppingList[]>({
    queryKey: ["/api/shopping-lists"],
    queryFn: async () => {
      const response = await fetch('/api/shopping-lists');
      if (!response.ok) {
        throw new Error('Failed to fetch shopping lists');
      }
      return response.json();
    },
    enabled: !!user,
  });

  // Create a new shopping list
  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!user) throw new Error("User not authenticated");
      const res = await apiRequest("POST", "/api/shopping-lists", { 
        name,
        userId: user.id
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shopping-lists"] });
      setNewListName("");
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Shopping list created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create shopping list: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete a shopping list
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/shopping-lists/${id}`);
      return res.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shopping-lists"] });
      toast({
        title: "Success",
        description: "Shopping list deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete shopping list: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      createMutation.mutate(newListName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 mb-16 md:mb-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Shopping Lists</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New List
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateList}>
                  <DialogHeader>
                    <DialogTitle>Create a new shopping list</DialogTitle>
                    <DialogDescription>
                      Create a list to organize your shopping items. You can add products to it later.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Input
                      placeholder="List name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className="mb-2"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={!newListName.trim() || createMutation.isPending}
                    >
                      {createMutation.isPending ? "Creating..." : "Create List"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Lists</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array(4).fill(0).map((_, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-2/3" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-9 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : shoppingLists && shoppingLists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {shoppingLists.map((list) => (
                    <ShoppingListCard 
                      key={list.id} 
                      list={list} 
                      onDelete={() => deleteMutation.mutate(list.id)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBasket className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No shopping lists yet</h3>
                  <p className="text-muted-foreground mt-1 mb-4">Create a new shopping list to get started</p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create List
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="text-center py-12">
                <Check className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No completed shopping lists</h3>
                <p className="text-muted-foreground">Completed shopping lists will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <MobileNavigation />
    </div>
  );
}

function ShoppingListCard({ list, onDelete }: { list: ShoppingList; onDelete: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Fetch list items for this shopping list
  const { data: listItems, isLoading } = useQuery<ListItem[]>({
    queryKey: ["/api/list-items", list.id],
    queryFn: async () => {
      const response = await fetch(`/api/list-items/${list.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch list items');
      }
      return response.json();
    },
  });
  
  const itemCount = listItems?.length || 0;
  const completedCount = listItems?.filter(item => item.completed).length || 0;
  
  // Format date to readable format
  const formatDate = (dateString: Date | null) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{list.name}</CardTitle>
            <CardDescription>
              Created {formatDate(list.createdAt)}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center">
                <PenLine className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <Check className="h-4 w-4 mr-2" /> Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center text-destructive" 
                onClick={onDelete}
              >
                <Trash className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        ) : itemCount > 0 ? (
          <div className="space-y-2">
            {listItems?.slice(0, isExpanded ? undefined : 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox checked={item.completed || false} />
                <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                  {item.quantity && item.quantity > 1 ? `${item.quantity}× ` : ""}
                  Item {item.id} {/* Would display product name in real app */}
                </span>
              </div>
            ))}
            {!isExpanded && itemCount > 3 && (
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                onClick={() => setIsExpanded(true)}
              >
                Show {itemCount - 3} more...
              </Button>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No items in this list yet</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" size="sm">
          Add Items
        </Button>
      </CardFooter>
    </Card>
  );
}