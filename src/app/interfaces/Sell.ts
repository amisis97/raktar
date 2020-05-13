import { firestore } from 'firebase';

export interface Sell {
  sID: string;
  buyer: string;
  date: firestore.Timestamp;
  products: string[];
}
