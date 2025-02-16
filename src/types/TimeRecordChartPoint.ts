export interface TimeRecordPoint {
  totalTime: number;
  day: string;
}

/**
 * 引数が TimeRecordPoint 型であるかどうかを判定する関数
 * @param arg - 判定する対象
 * @returns 引数が TimeRecordPoint 型である場合は true、それ以外の場合は false
 */
export const isTimeRecordPoint = (arg: unknown): arg is TimeRecordPoint => {
  if (typeof arg !== "object" || arg === null) {
    return false;
  }

  const { totalTime, day } = arg as Record<keyof TimeRecordPoint, unknown>;

  return typeof totalTime === "number" && typeof day === "string";
};
