import { addTimeRecord } from "@/lib/saveTimeRecord";
import { TimeRecord } from "@/types/TimeRecord";
import { isTimeRecordSummary } from "@/types/TimeRecordSummary";
import { runTransaction, Timestamp } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  runTransaction: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  Timestamp: { fromDate: jest.fn() },
}));

jest.mock("@/types/TimeRecordSummary", () => ({
  isTimeRecordSummary: jest.fn(),
}));

const mockTransactionGet = jest.fn();
const mockTransaction = {
  get: mockTransactionGet,
  set: jest.fn(),
  update: jest.fn(),
};
const mockRunTransaction = runTransaction as jest.Mock;

const mockTimeRecord: TimeRecord = {
  elapsedTime: 0,
  startTime: Timestamp.fromDate(new Date()),
};

beforeEach(() => {
  jest.resetAllMocks();
  mockTransactionGet.mockImplementation(async () => {
    return {
      exists: jest.fn(),
      data: jest.fn().mockReturnValue(mockTimeRecord),
    };
  });
  mockRunTransaction.mockImplementation(async (_db, transactionFn) => {
    await transactionFn({ ...mockTransaction });
  });
});

describe("saveTimeRecord", () => {
  describe("addTimeRecord ", () => {
    test("should call runTransaction", async () => {
      await addTimeRecord("userId", new Date(), 0);

      expect(runTransaction).toHaveBeenCalled();
    });

    test("should call set", async () => {
      await addTimeRecord("userId", new Date(), 0);

      expect(mockTransaction.set).toHaveBeenCalled();
    });

    test("should throw error", async () => {
      mockRunTransaction.mockImplementation(() => {
        throw new Error();
      });

      expect(addTimeRecord("userId", new Date(), 0)).rejects.toThrow();
    });

    test("should call update", async () => {
      mockTransactionGet.mockImplementation(async () => {
        return {
          exists: jest.fn().mockReturnValue(true),
          data: jest.fn().mockReturnValue(mockTimeRecord),
        };
      });
      (isTimeRecordSummary as unknown as jest.Mock).mockReturnValue(true);
      await addTimeRecord("userId", new Date(), 0);

      expect(mockTransaction.update).toHaveBeenCalled();
    });
  });
});
