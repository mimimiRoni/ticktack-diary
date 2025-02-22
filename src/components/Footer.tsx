"use client";

import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/common/Button/Button";

/**
 * @summary フッターのコンポーネント
 * @returns フッターの JSX 要素
 */
export default function Footer() {
  // TODO: 動作確認用のログアウト処理
  const logOutHandler = async () => {
    await signOut(auth);
  };

  // 動作確認用ページ表示用
  const path = usePathname();

  return (
    <div>
      <hr />
      <h2>TickTack-Diary作成中（動作確認用Linkまとめ）：{path}</h2>
      <Button variant="fill">
        <Link href="/">トップ</Link>
      </Button>
      <Button>
        <Link href="/register">アカウント登録</Link>
      </Button>
      <Button>
        <Link href="/login">ログイン</Link>
      </Button>
      <Button onClick={() => logOutHandler()}>ログアウト</Button>
      <Button>
        <Link href="/verify-email">メール認証送信ページ</Link>
      </Button>
      <Button disabled={true}>
        <Link href="/finish-register">メール認証完了ページ</Link>
      </Button>
      <Button>
        <Link href="/timer">時間計測ページ</Link>
      </Button>
      <Button>
        <Link href="/records">時間記録閲覧ページ</Link>
      </Button>
    </div>
  );
}
