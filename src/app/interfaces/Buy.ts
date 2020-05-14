import { firestore } from 'firebase';

export interface Buy {
  bID: string;
  date: firestore.Timestamp;
  seller: string;
  products: any[];
}
