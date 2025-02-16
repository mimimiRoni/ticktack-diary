import { db } from "@/configs/firebaseConfig";
import {
  isTimeRecordSummary,
  TimeRecordSummary,
} from "@/types/TimeRecordSummary";
import { collection, getDocs } from "firebase/firestore";

export const getMonthlyDailySummary = async (
  userId: string,
  year: string,
  month: string,
) => {
  const dailyCollectionRef = collection(
    db,
    `users/${userId}/summaries/${year}/monthly/${month}/daily`,
  );
  const querySnapshot = await getDocs(dailyCollectionRef);
  return querySnapshot.docs.map((doc) => {
    const record: TimeRecordSummary = isTimeRecordSummary(doc.data())
      ? (doc.data() as TimeRecordSummary)
      : {
          totalTime: 0,
          recordCount: 0,
        };

    return {
      day: doc.id,
      totalTime: record.totalTime,
    };
  });
};
