"use client";

import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <button>
        <Link href="/">トップ</Link>
      </button>
      <button>
        <Link href="/register">アカウント登録</Link>
      </button>
      <button>
        <Link href="/login">ログイン</Link>
      </button>
      <button onClick={() => logOutHandler()}>ログアウト</button>
      <button>
        <Link href="/verify-email">メール認証送信ページ</Link>
      </button>
      <button>
        <Link href="/finish-register">メール認証完了ページ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページ</Link>
      </button>
      <button>
        <Link href="/records">時間記録閲覧ページ</Link>
      </button>
    </div>
  );
}
