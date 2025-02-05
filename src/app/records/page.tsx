import Link from "next/link";

/**
 * 記録の閲覧編集ページを表示するコンポーネント
 * @returns 記録の閲覧編集ページの JSX 要素
 */
export default function Records() {
  return (
    <div>
      <h1>記録の閲覧編集ページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページへ</Link>
      </button>
    </div>
  );
}
