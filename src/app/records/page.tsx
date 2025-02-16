"use client";

import { DailyChart } from "@/components/charts/DailyChart";
import { useLoggedInUser } from "@/hooks/auth/useLoggedInUser";
import { getMonthlyDailySummary } from "@/lib/getTimeRecords";
import Link from "next/link";
import { useState } from "react";
/**
 * 記録の閲覧編集ページを表示するコンポーネント
 * @returns 記録の閲覧編集ページの JSX 要素
 */
export default function Records() {
  const { loginUser } = useLoggedInUser();
  const [data, setData] = useState<
    { day: string; totalTime: number }[] | null
  >();

  // TODO: カスタムフックにまとめたり、ContainerでWrapしたりしてChart関係を分離する
  const now = new Date(Date.now());
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  if (loginUser && !data) {
    getMonthlyDailySummary(loginUser.uid, year, month).then((response) => {
      // TODO: 記録が存在しない日は0でChartに表示できるようにデータを追加する
      setData(response);
    });
  }

  return (
    <div>
      <h1>記録の閲覧編集ページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページへ</Link>
      </button>
      {data && <h2>{`${year} ${month}`}月</h2>}
      {data && <DailyChart data={data} />}
    </div>
  );
}
