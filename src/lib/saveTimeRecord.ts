import { getIdToken, User } from "firebase/auth";
export const addTimeRecord = async (
  user: User,
  categoryId: string,
  startTime: Date,
  elapsedTime: number,
) => {
  try {
    const token = await getIdToken(user);
    await fetch("/api/time/records", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "category-id": categoryId,
        "started-at": startTime.toJSON(),
        "duration-ms": elapsedTime.toString(),
      }),
    });
  } catch (error) {
    throw error;
  }
};
