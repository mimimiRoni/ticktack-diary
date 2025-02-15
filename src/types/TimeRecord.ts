import { Timestamp } from "firebase/firestore";

export interface TimeRecord {
  elapsedTime: number;
  startTime: Timestamp;
}
