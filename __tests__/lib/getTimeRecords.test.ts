import { getMonthlyDailySummary } from "@/lib/getTimeRecords";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";
import { isTimeRecordSummary } from "@/types/TimeRecordSummary";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("@/types/TimeRecordSummary", () => ({
  isTimeRecordSummary: jest.fn(),
}));

describe("getTimeRecords", () => {
  describe("getMonthlyDailySummary", () => {
    const userId = "testUser";
    const year = 2023;
    const month = 1;
    const monthDaysLength = new Date(year, month + 1, 0).getDate();
    const formatMonth = (month + 1).toString().padStart(2, "0");
    const mockDocs = [
      { id: "01", data: () => ({ totalTime: 120 }) },
      { id: "02", data: () => ({ totalTime: 150 }) },
    ];

    beforeEach(() => {
      jest.resetAllMocks();
      (collection as jest.Mock).mockReturnValue("mockCollectionRef");
      (getDocs as jest.Mock).mockResolvedValue({ docs: mockDocs });
    });

    test("should fetch the correct collection reference", async () => {
      await getMonthlyDailySummary(userId, year, month);
      expect(collection).toHaveBeenCalledWith(
        db,
        `users/${userId}/summaries/${year}/monthly/${formatMonth}/daily`,
      );
    });

    test("should return summary length is equal days length if some docs", async () => {
      (isTimeRecordSummary as unknown as jest.Mock).mockReturnValue(true);
      const result = await getMonthlyDailySummary(userId, year, month);
      expect(result.length).toBe(monthDaysLength);
    });

    test("should return summary length is equal days length if no doc", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
      const result = await getMonthlyDailySummary(userId, year, month);
      expect(result.length).toBe(monthDaysLength);
    });
  });
});
