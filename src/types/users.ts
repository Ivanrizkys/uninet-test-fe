import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: Timestamp;
}
