import Link from "next/link";

/**
 * Home component
 * @returns The rendered component
 */
export default function Home() {
  return (
    <div>
      <h1>TickTack-Diary作成中……（トップページ）</h1>
      <button>
        <Link href="/register">アカウント登録</Link>
      </button>
      <button>
        <Link href="/login">ログイン</Link>
      </button>
    </div>
  );
}
