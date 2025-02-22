"use client";

import Button from "@/components/common/Button/Button";
import { useLoggedInUser } from "@/hooks/auth/useLoggedInUser";
import Link from "next/link";

/**
 * 設定ページを表示するコンポーネント
 * @returns 設定ページの JSX 要素
 */
export default function Settings() {
  // TODO: ログインが必要なページとしてわかりやすくしておくので、あとで実際に使用する
  useLoggedInUser();

  return (
    <div>
      <h1>設定ページ</h1>
      <Button>
        <Link href="/">トップへ</Link>
      </Button>
      <Button>
        <Link href="/timer">時間計測ページへ</Link>
      </Button>
    </div>
  );
}
