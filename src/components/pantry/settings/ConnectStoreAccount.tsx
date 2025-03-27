
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { StoreWithLocations } from '../shopping/hooks/types/storeTypes';

interface ConnectStoreAccountProps {
  store: StoreWithLocations;
  onConnect: (storeId: string, loyaltyNumber: string) => void;
}

const ConnectStoreAccount = ({ store, onConnect }: ConnectStoreAccountProps) => {
  const [loyaltyNumber, setLoyaltyNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!loyaltyNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a loyalty number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call to verify and connect account
    setTimeout(() => {
      onConnect(store.id, loyaltyNumber);
      setLoyaltyNumber('');
      setLoading(false);
      
      toast({
        title: "Account Connected",
        description: `Your ${store.name} account has been successfully connected.`,
      });
    }, 1500);
  };

  if (store.accountConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: store.color || '#888' }} />
            {store.name}
          </CardTitle>
          <CardDescription>
            Account already connected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loyalty Number:</span>
              <span className="font-medium">{store.loyaltyNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-600 font-medium">Connected</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              onConnect(store.id, '');
              toast({
                title: "Account Disconnected",
                description: `Your ${store.name} account has been disconnected.`,
              });
            }}
          >
            Disconnect Account
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: store.color || '#888' }} />
          {store.name}
        </CardTitle>
        <CardDescription>
          Connect your loyalty account to track orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`loyalty-${store.id}`}>Loyalty Number</Label>
            <Input
              id={`loyalty-${store.id}`}
              placeholder="Enter your loyalty number"
              value={loyaltyNumber}
              onChange={(e) => setLoyaltyNumber(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectStoreAccount;
