import { firestore } from 'firebase';
import { Partner } from './Partner';
import { Product } from './Product';

interface SellProduct {
  productId: string;
  count: number;
  price: number;
}

export interface Sell {
  sID: string;
  buyer: string;
  partner: Partner;
  date: firestore.Timestamp;
  products: SellProduct[];
  productsObj: Product[];
  total: number;
}
