import { db } from "@/configs/firebaseConfig";
import { TimeRecordPoint } from "@/types/TimeRecordChartPoint";
import {
  isTimeRecordSummary,
  TimeRecordSummary,
} from "@/types/TimeRecordSummary";
import { collection, getDocs } from "firebase/firestore";

export const getMonthlyDailySummary = async (
  userId: string,
  year: number,
  month: number,
) => {
  // DD
  const dailyCollectionRef = collection(
    db,
    `users/${userId}/summaries/${year.toString()}/monthly/${formatMonthText(month)}/daily`,
  );

  const querySnapshot = await getDocs(dailyCollectionRef);
  const saveDataMap = new Map(
    querySnapshot.docs.map((doc) => {
      const record: TimeRecordSummary = isTimeRecordSummary(doc.data())
        ? (doc.data() as TimeRecordSummary)
        : {
            totalTime: 0,
            recordCount: 0,
          };

      return [doc.id, record.totalTime];
    }),
  );

  // month 月の最終日 → month 月の日付の数
  const monthDaysLength = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: monthDaysLength }, (_, i) => {
    const day = formatMonthText(i);
    const data: TimeRecordPoint = {
      day: day,
      totalTime: saveDataMap.get(day) ?? 0,
    };
    return data;
  });
};

const formatMonthText = (month: number) => {
  return (month + 1).toString().padStart(2, "0");
};
