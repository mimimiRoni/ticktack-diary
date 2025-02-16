import { db } from "@/configs/firebaseConfig";
import { TimeRecord } from "@/types/TimeRecord";
import {
  isTimeRecordSummary,
  TimeRecordSummary,
} from "@/types/TimeRecordSummary";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  runTransaction,
  Timestamp,
  Transaction,
} from "firebase/firestore";

export const addTimeRecord = async (
  userId: string,
  startTime: Date,
  elapsedTime: number,
) => {
  const userDoc = doc(db, "users", userId);
  const timeRecordsCollection = collection(userDoc, "timeRecords");
  const newRecordDoc = doc(timeRecordsCollection);
  const newRecordData: TimeRecord = {
    startTime: Timestamp.fromDate(new Date(startTime)),
    elapsedTime: elapsedTime,
  };

  // summaries/YYYY
  const yearKey = `users/${userId}/summaries/${startTime.getFullYear()}`;

  // summaries/YYYY/monthly/MM
  const month = startTime.getMonth() + 1;
  const monthKey = `${yearKey}/monthly/${month.toString().padStart(2, "0")}`;

  // summaries/YYYY/monthly/MM/daily/DD
  const dateKey = `${monthKey}/daily/${startTime.getDate().toString().padStart(2, "0")}`;

  const summaryDocRefs = {
    yearly: doc(db, yearKey),
    monthly: doc(db, monthKey),
    daily: doc(db, dateKey),
  };

  try {
    await runTransaction(db, async (transaction: Transaction) => {
      const yearlyDoc = await transaction.get(summaryDocRefs.yearly);
      const monthlyDoc = await transaction.get(summaryDocRefs.monthly);
      const daiDoc = await transaction.get(summaryDocRefs.daily);

      transaction.set(newRecordDoc, newRecordData);
      updateSummary(
        transaction,
        yearlyDoc,
        summaryDocRefs.yearly,
        newRecordData,
      );
      updateSummary(
        transaction,
        monthlyDoc,
        summaryDocRefs.monthly,
        newRecordData,
      );
      updateSummary(transaction, daiDoc, summaryDocRefs.daily, newRecordData);
    });
  } catch (error) {
    throw error;
  }
};

const updateSummary = (
  transaction: Transaction,
  doc: DocumentSnapshot<DocumentData, DocumentData>,
  docRef: DocumentReference<DocumentData, DocumentData>,
  newRecord: TimeRecord,
) => {
  if (doc.exists() && isTimeRecordSummary(doc.data())) {
    const docData = doc.data() as TimeRecordSummary;

    docData.totalTime += newRecord.elapsedTime;
    docData.recordCount += 1;

    // updateはそのまま値を渡せなかったので、スプレッドで。
    transaction.update(docRef, { ...docData });
  } else {
    const newData: TimeRecordSummary = {
      totalTime: newRecord.elapsedTime,
      recordCount: 1,
    };

    transaction.set(docRef, newData);
  }
};
