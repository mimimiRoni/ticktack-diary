import Link from "next/link";
import Button from "@/components/common/Button/Button";

/**
 * Home component
 * @returns The rendered component
 */
export default function Home() {
  return (
    <div>
      <h1>TickTack-Diary作成中……（トップページ）</h1>
      <Button>
        <Link href="/register">アカウント登録</Link>
      </Button>
      <Button variant="outline">
        <Link href="/login">ログイン</Link>
      </Button>
    </div>
  );
}
