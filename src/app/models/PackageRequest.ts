import {User} from './User';

export class PackageRequest {
  id: number;
  createdDate: string;
  chinaWarehouseArrivedDate: string;
  chinaWarehouseSentDate: string;
  localWarehouseArrivedDate: string;
  packageRequestClose: string;
  itemType: string;
  price: number;
  currency: string;
  amount: number;
  shopName: string;
  itemNotes: string;
  itemPhoto: boolean;
  itemInsurance: boolean;
  itemCheck: boolean;
  itemRepack: boolean;
  itemSplit: boolean;
  user: User;
}

