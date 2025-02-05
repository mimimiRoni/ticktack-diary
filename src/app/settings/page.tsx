import Link from "next/link";

/**
 * 設定ページを表示するコンポーネント
 * @returns 設定ページの JSX 要素
 */
export default function Settings() {
  return (
    <div>
      <h1>設定ページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページへ</Link>
      </button>
    </div>
  );
}
