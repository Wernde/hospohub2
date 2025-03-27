
import { useState, useContext, createContext } from 'react';

interface StoreDialogContextProps {
  showAddStore: boolean;
  setShowAddStore: (value: boolean) => void;
  showAddLocation: string | null;
  setShowAddLocation: (storeId: string | null) => void;
}

const StoreDialogContext = createContext<StoreDialogContextProps>({
  showAddStore: false,
  setShowAddStore: () => {},
  showAddLocation: null,
  setShowAddLocation: () => {}
});

export const StoreDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [showAddStore, setShowAddStore] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState<string | null>(null);

  return (
    <StoreDialogContext.Provider value={{
      showAddStore,
      setShowAddStore,
      showAddLocation,
      setShowAddLocation
    }}>
      {children}
    </StoreDialogContext.Provider>
  );
};

export const useStoreDialog = () => useContext(StoreDialogContext);
