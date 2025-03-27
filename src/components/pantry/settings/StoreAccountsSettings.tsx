
import React from 'react';
import { useStoreSettings } from '../shopping/hooks/useStoreSettings';
import { useToast } from '@/hooks/use-toast';
import ConnectStoreAccount from './ConnectStoreAccount';

const StoreAccountsSettings = () => {
  const { stores, updateStores } = useStoreSettings();
  const { toast } = useToast();

  const handleConnectAccount = (storeId: string, loyaltyNumber: string) => {
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          accountConnected: loyaltyNumber ? true : false,
          loyaltyNumber: loyaltyNumber || undefined
        };
      }
      return store;
    });

    updateStores(updatedStores);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Store Accounts</h2>
        <p className="text-muted-foreground mb-6">
          Connect your store loyalty accounts to automatically track orders and update your pantry.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {stores.map(store => (
          <ConnectStoreAccount
            key={store.id}
            store={store}
            onConnect={handleConnectAccount}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreAccountsSettings;
