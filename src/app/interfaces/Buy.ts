import { firestore } from 'firebase';
import { Partner } from './Partner';
import { Product } from './Product';

export interface Buy {
  bID: string;
  date: firestore.Timestamp;
  seller: Partner;
  sellerId: string;
  productId: string;
  product: Product;
  stock: number;
}
