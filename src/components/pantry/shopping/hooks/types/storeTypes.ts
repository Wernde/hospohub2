
export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  isPreferred: boolean;
}

export interface Store {
  id: string;
  name: string;
  color?: string;
}

export interface StoreWithLocations extends Store {
  locations: StoreLocation[];
  accountConnected: boolean;
  loyaltyNumber?: string;
}

export interface PriceData {
  storeId: string;
  locationId: string;
  price: number;
  inStock: boolean;
  lastUpdated: string;
}

export interface StoreSettings {
  preferredStores: StoreWithLocations[];
  defaultStoreId: string;
  defaultLocationId: string;
}
