"use client";

import StopwatchComponent from "@/modules/timer/StopwatchComponent";
import { useLoggedInUser } from "@/hooks/auth/useLoggedInUser";
import Link from "next/link";

/**
 * 時間計測ページを表示するコンポーネント
 * @returns 時間計測ページの JSX 要素
 */
export default function Timer() {
  // TODO: ログインが必要なページとしてわかりやすくしておくので、あとで実際に使用する
  useLoggedInUser();

  return (
    <div>
      <h1>時間計測ページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/records">時間記録編集ページへ</Link>
      </button>
      <button>
        <Link href="/settings">設定ページへ</Link>
      </button>
      <StopwatchComponent />
    </div>
  );
}
