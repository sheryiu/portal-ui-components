export type InventoryItem = {
  id: string;
  netWeight: number;
  grossWeight: number;
  contents: InventoryItemContent[];
  isContainFragile: boolean;
  arrivedAt: Date;
  belongsTo: string;
  status: InventoryItemStatus;
}

export type InventoryItemContent = {
  id: string;
  description: string;
  isbn: string | null;
  type: InventoryItemContentType;
  quantity: number;
  totalPrice: number;
}

export enum InventoryItemStatus {
  OPEN = 'Open',
  REPACKAGING = 'Repackaging',
  WAITING_FOR_DELIVERY = 'Waiting for delivery',
  DELIVERED = 'Delivered',
  EXPIRED = 'Expired',
}

export enum InventoryItemContentType {
  ACCESSORY = 'Accessory',
  BOOK = 'Book',
  CDDVD = 'CD / DVD',
  CLOTHING = 'Clothing',
  ELECTRONICS = 'Electronics',
  FOOD = 'Food',
  GOODS = 'Goods',
  INSTRUMENT = 'Instrument',
  STATIONARY = 'Stationary',
  UTENSIL = 'Utensil',
  OTHERS = 'Others',
}

export type InventoryShelf = {
  id: string;
  location: {
    row: number;
    aisle: string;
    layer: number;
  };
  isAllowFragileItems: boolean;
  maxCapacity: number;
  dimensions: {
    width: number; // millimeter
    height: number; // millimeter
    depth: number; // millimeter
  }
}