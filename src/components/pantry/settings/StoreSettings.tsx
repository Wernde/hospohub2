
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StoreWithLocations } from '../shopping/hooks/types/storeTypes';
import { StoreDialogProvider } from './hooks/useStoreDialog';
import StoreAccountsSettings from './StoreAccountsSettings';
import StoresTabContent from './tabs/StoresTabContent';

interface StoreSettingsProps {
  stores: StoreWithLocations[];
  onUpdateStores: (stores: StoreWithLocations[]) => void;
  defaultStoreId: string;
  onSetDefaultStore: (storeId: string, locationId: string) => void;
}

const StoreSettingsContent = ({ 
  stores, 
  onUpdateStores, 
  defaultStoreId,
  onSetDefaultStore 
}: StoreSettingsProps) => {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Store Settings</h2>
          <p className="text-muted-foreground">
            Manage your preferred stores, locations, and connected accounts.
          </p>
        </div>
      </div>

      <Tabs defaultValue="stores" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="stores">Stores & Locations</TabsTrigger>
          <TabsTrigger value="accounts">Store Accounts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stores" className="mt-6">
          <StoresTabContent 
            stores={stores}
            onUpdateStores={onUpdateStores}
            defaultStoreId={defaultStoreId}
            onSetDefaultStore={onSetDefaultStore}
          />
        </TabsContent>
        
        <TabsContent value="accounts" className="mt-6">
          <StoreAccountsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Wrap the component with the StoreDialogProvider
const StoreSettings = (props: StoreSettingsProps) => (
  <StoreDialogProvider>
    <StoreSettingsContent {...props} />
  </StoreDialogProvider>
);

export default StoreSettings;
