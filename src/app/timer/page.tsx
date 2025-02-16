import StopwatchComponent from "@/modules/timer/StopwatchComponent";
import Link from "next/link";

/**
 * 時間計測ページを表示するコンポーネント
 * @returns 時間計測ページの JSX 要素
 */
export default function Timer() {
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
