import { firestore } from 'firebase';

export interface TaskElement {
  name: string;
  description: string;
  created: firestore.Timestamp;
  deadline: firestore.Timestamp;
  priority: boolean;
  done: boolean;
  taskId: string;
}
