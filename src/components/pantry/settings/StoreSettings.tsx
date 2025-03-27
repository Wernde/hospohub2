
import React, { useState } from 'react';
import { PlusCircle, Store, MapPin, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { StoreWithLocations } from '../shopping/hooks/types/storeTypes';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface StoreSettingsProps {
  stores: StoreWithLocations[];
  onUpdateStores: (stores: StoreWithLocations[]) => void;
  defaultStoreId: string;
  onSetDefaultStore: (storeId: string, locationId: string) => void;
}

const StoreSettings = ({ 
  stores, 
  onUpdateStores, 
  defaultStoreId,
  onSetDefaultStore 
}: StoreSettingsProps) => {
  const { toast } = useToast();
  const [showAddStore, setShowAddStore] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState<string | null>(null);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreColor, setNewStoreColor] = useState('#4CAF50');
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationAddress, setNewLocationAddress] = useState('');

  const handleAddStore = () => {
    if (!newStoreName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a store name",
        variant: "destructive"
      });
      return;
    }

    const newStore: StoreWithLocations = {
      id: `store-${Date.now()}`,
      name: newStoreName,
      color: newStoreColor,
      locations: [],
      accountConnected: false
    };

    onUpdateStores([...stores, newStore]);
    setNewStoreName('');
    setNewStoreColor('#4CAF50');
    setShowAddStore(false);
    
    toast({
      title: "Store Added",
      description: `${newStoreName} has been added to your stores.`
    });
  };

  const handleAddLocation = (storeId: string) => {
    if (!newLocationName.trim() || !newLocationAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter both a location name and address",
        variant: "destructive"
      });
      return;
    }

    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          locations: [
            ...store.locations,
            {
              id: `location-${Date.now()}`,
              name: newLocationName,
              address: newLocationAddress,
              isPreferred: store.locations.length === 0 // First location is preferred by default
            }
          ]
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
    setNewLocationName('');
    setNewLocationAddress('');
    setShowAddLocation(null);
    
    toast({
      title: "Location Added",
      description: `${newLocationName} has been added.`
    });
  };

  const handleRemoveStore = (storeId: string) => {
    const updatedStores = stores.filter(store => store.id !== storeId);
    onUpdateStores(updatedStores);
    
    // If we're removing the default store, set a new default
    if (storeId === defaultStoreId && updatedStores.length > 0) {
      const newDefault = updatedStores[0];
      const defaultLocation = newDefault.locations.length > 0 ? newDefault.locations[0].id : '';
      onSetDefaultStore(newDefault.id, defaultLocation);
    }
    
    toast({
      title: "Store Removed",
      description: "The store has been removed from your list."
    });
  };

  const handleRemoveLocation = (storeId: string, locationId: string) => {
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        const updatedLocations = store.locations.filter(loc => loc.id !== locationId);
        return {
          ...store,
          locations: updatedLocations
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
    
    toast({
      title: "Location Removed",
      description: "The location has been removed."
    });
  };

  const setAsDefault = (storeId: string, locationId: string) => {
    onSetDefaultStore(storeId, locationId);
    
    toast({
      title: "Default Store Set",
      description: "Your default store and location have been updated."
    });
  };

  const togglePreferredLocation = (storeId: string, locationId: string) => {
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        const updatedLocations = store.locations.map(loc => ({
          ...loc,
          isPreferred: loc.id === locationId ? !loc.isPreferred : loc.isPreferred
        }));
        return {
          ...store,
          locations: updatedLocations
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
  };

  const connectStoreAccount = (storeId: string) => {
    // This would connect to the store's API in a real implementation
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          accountConnected: true,
          loyaltyNumber: "1234567890" // Simulated loyalty number
        };
      }
      return store;
    });

    onUpdateStores(updatedStores);
    
    toast({
      title: "Account Connected",
      description: "Your store account has been connected successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Store Settings</h2>
          <p className="text-muted-foreground">
            Manage your preferred stores and locations for shopping.
          </p>
        </div>
        <Button onClick={() => setShowAddStore(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </div>

      {stores.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Store className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">No stores added yet</p>
            <p className="text-sm text-muted-foreground">
              Add stores to track prices and manage your shopping list more effectively.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stores.map(store => (
            <Card key={store.id} className={store.id === defaultStoreId ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: store.color }} />
                    <CardTitle>{store.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {store.id === defaultStoreId && (
                      <Badge variant="default">Default</Badge>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveStore(store.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {store.accountConnected ? (
                    <span className="flex items-center text-green-600">
                      <Check className="mr-1 h-3 w-3" /> 
                      Connected (Loyalty #: {store.loyaltyNumber})
                    </span>
                  ) : (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm" 
                      onClick={() => connectStoreAccount(store.id)}
                    >
                      Connect store account
                    </Button>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Locations</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAddLocation(store.id)}
                    >
                      <PlusCircle className="mr-2 h-3 w-3" />
                      Add Location
                    </Button>
                  </div>
                  
                  {store.locations.length === 0 ? (
                    <div className="text-sm text-muted-foreground py-2">
                      No locations added yet
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {store.locations.map(location => (
                        <div 
                          key={location.id} 
                          className="flex justify-between items-start p-3 border rounded-md"
                        >
                          <div>
                            <div className="font-medium text-sm flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {location.name}
                              {location.isPreferred && (
                                <Badge variant="outline" className="ml-1 text-xs">Preferred</Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {location.address}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`preferred-${location.id}`}
                                checked={location.isPreferred}
                                onCheckedChange={() => togglePreferredLocation(store.id, location.id)}
                              />
                              <Label htmlFor={`preferred-${location.id}`} className="text-xs">
                                Preferred
                              </Label>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => handleRemoveLocation(store.id, location.id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    const defaultLocation = store.locations.length > 0 ? 
                      store.locations.find(l => l.isPreferred)?.id || store.locations[0].id : 
                      '';
                    setAsDefault(store.id, defaultLocation);
                  }}
                  disabled={store.id === defaultStoreId || store.locations.length === 0}
                >
                  Set as Default Store
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add Store Dialog */}
      <Dialog open={showAddStore} onOpenChange={setShowAddStore}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Store</DialogTitle>
            <DialogDescription>
              Enter the details for the store you want to add.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input 
                id="store-name"
                placeholder="Enter store name" 
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-color">Store Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="store-color"
                  type="color"
                  className="w-16 h-10 p-1"
                  value={newStoreColor}
                  onChange={(e) => setNewStoreColor(e.target.value)}
                />
                <div 
                  className="h-10 flex-1 rounded-md border"
                  style={{ backgroundColor: newStoreColor }}
                ></div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStore(false)}>Cancel</Button>
            <Button onClick={handleAddStore}>Add Store</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Location Dialog */}
      <Dialog open={!!showAddLocation} onOpenChange={() => setShowAddLocation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Enter the details for the location you want to add.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="location-name">Location Name</Label>
              <Input 
                id="location-name"
                placeholder="Enter location name (e.g., Downtown)" 
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-address">Address</Label>
              <Input 
                id="location-address"
                placeholder="Enter full address" 
                value={newLocationAddress}
                onChange={(e) => setNewLocationAddress(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddLocation(null)}>Cancel</Button>
            <Button onClick={() => showAddLocation && handleAddLocation(showAddLocation)}>
              Add Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreSettings;
