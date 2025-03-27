
import React from 'react';
import { Store } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const EmptyStoreState = () => {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <Store className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-lg font-medium">No stores added yet</p>
        <p className="text-sm text-muted-foreground">
          Add stores to track prices and manage your shopping list more effectively.
        </p>
      </CardContent>
    </Card>
  );
};
