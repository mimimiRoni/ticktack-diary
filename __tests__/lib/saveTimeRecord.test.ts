import { addTimeRecord } from "../../src/lib/saveTimeRecord";
import { getIdToken, User } from "firebase/auth";

jest.mock("firebase/auth");
global.fetch = jest.fn();

describe("addTimeRecord", () => {
  const mockUser = { uid: "123" } as User;
  const mockCategoryId = "category1";
  const mockStartTime = new Date();
  const mockElapsedTime = 1000;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call getIdToken with the user", async () => {
    (getIdToken as jest.Mock).mockResolvedValue("mockToken");

    await addTimeRecord(
      mockUser,
      mockCategoryId,
      mockStartTime,
      mockElapsedTime,
    );

    expect(getIdToken).toHaveBeenCalledWith(mockUser);
  });

  test("should call fetch with the correct parameters", async () => {
    (getIdToken as jest.Mock).mockResolvedValue("mockToken");

    await addTimeRecord(
      mockUser,
      mockCategoryId,
      mockStartTime,
      mockElapsedTime,
    );

    expect(fetch).toHaveBeenCalledWith("/api/time/records", {
      method: "POST",
      headers: {
        Authorization: `Bearer mockToken`,
      },
      body: JSON.stringify({
        "category-id": mockCategoryId,
        "started-at": mockStartTime.toJSON(),
        "duration-ms": mockElapsedTime.toString(),
      }),
    });
  });

  test("should throw an error if getIdToken fails", async () => {
    const mockError = new Error("getIdToken error");
    (getIdToken as jest.Mock).mockRejectedValue(mockError);

    await expect(
      addTimeRecord(mockUser, mockCategoryId, mockStartTime, mockElapsedTime),
    ).rejects.toThrow(mockError);
  });

  test("should throw an error if fetch fails", async () => {
    (getIdToken as jest.Mock).mockResolvedValue("mockToken");
    const mockError = new Error("fetch error");
    (fetch as jest.Mock).mockRejectedValue(mockError);

    await expect(
      addTimeRecord(mockUser, mockCategoryId, mockStartTime, mockElapsedTime),
    ).rejects.toThrow(mockError);
  });
});
