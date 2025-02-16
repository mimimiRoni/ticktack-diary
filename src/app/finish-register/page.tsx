"use client";

import { auth } from "@/configs/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * 登録を完了するページのコンポーネント
 * @returns 登録を完了するページの JSX 要素
 */
export default function FinishRegister() {
  const router = useRouter();
  if (auth.currentUser) {
    if (auth.currentUser.emailVerified === false) {
      router.push("/verify-email");
    }
  }

  auth.signOut();

  return (
    <div>
      <h1>登録を完了するページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページへ</Link>
      </button>
      <p>認証の完了のために、再度ログインしてください。</p>
      <p>ログインページに、下のボタンから移動してください。</p>
      {/* TODO: 自動でログインページに遷移させてもいいかも */}
      <button>
        <Link href="/login">ログインページへ</Link>
      </button>
    </div>
  );
}
