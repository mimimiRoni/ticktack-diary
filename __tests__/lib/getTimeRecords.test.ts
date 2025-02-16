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
    const year = "2023";
    const month = "01";
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
        `users/${userId}/summaries/${year}/monthly/${month}/daily`,
      );
    });

    test("should return the correct daily summaries", async () => {
      (isTimeRecordSummary as unknown as jest.Mock).mockReturnValue(true);
      const result = await getMonthlyDailySummary(userId, year, month);
      expect(result).toEqual([
        { day: "01", totalTime: 120 },
        { day: "02", totalTime: 150 },
      ]);
    });

    test("should handle empty collections", async () => {
      (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
      const result = await getMonthlyDailySummary(userId, year, month);
      expect(result).toEqual([]);
    });
  });
});
