export interface TimeRecordSummary {
  totalTime: number;
  recordCount: number;
}

/**
 * 引数が TimeRecordSummary 型であるかどうかを判定する関数
 * @param arg - 判定する対象
 * @returns 引数が TimeRecordSummary 型である場合は true、それ以外の場合は false
 */
export const isTimeRecordSummary = (arg: unknown): arg is TimeRecordSummary => {
  if (typeof arg !== "object" || arg === null) {
    return false;
  }

  const { totalTime, recordCount } = arg as Record<
    keyof TimeRecordSummary,
    unknown
  >;

  return typeof totalTime === "number" && typeof recordCount === "number";
};
