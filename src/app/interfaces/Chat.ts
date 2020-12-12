import { firestore } from 'firebase';

export interface Chat {
  date: firestore.Timestamp;
  message: string;
  sender: string;
}
