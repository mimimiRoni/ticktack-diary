"use client";

import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";

/**
 * Home component
 * @returns The rendered component
 */
export default function Home() {
  // TODO: 動作確認用のログアウト処理
  const logOutHandler = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h1>TickTack-Diary作成中……（トップページ）</h1>
      <button>
        <Link href="/register">アカウント登録</Link>
      </button>
      <button>
        <Link href="/login">ログイン</Link>
      </button>
      <button onClick={() => logOutHandler()}>ログアウト</button>
    </div>
  );
}
