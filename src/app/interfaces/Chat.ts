import { firestore } from 'firebase';

export interface Message {
  date: firestore.Timestamp;
  message: string;
  sender: string;
}

export interface Chat {
  cID: string;
  members: string[];
  msg: Message[];
}
