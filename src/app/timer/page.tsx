import Button from "@/components/common/Button/Button";
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
      <Button>
        <Link href="/">トップへ</Link>
      </Button>
      <Button>
        <Link href="/records">時間記録編集ページへ</Link>
      </Button>
      <Button>
        <Link href="/settings">設定ページへ</Link>
      </Button>
      <StopwatchComponent />
    </div>
  );
}
