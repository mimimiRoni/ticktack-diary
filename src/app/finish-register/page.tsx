"use client";

import Button from "@/components/common/Button/Button";
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
      <Button>
        <Link href="/">トップへ</Link>
      </Button>
      <Button>
        <Link href="/timer">時間計測ページへ</Link>
      </Button>
      <p>認証の完了のために、再度ログインしてください。</p>
      <p>ログインページに、下のボタンから移動してください。</p>
      {/* TODO: 自動でログインページに遷移させてもいいかも */}
      <Button>
        <Link href="/login">ログインページへ</Link>
      </Button>
    </div>
  );
}
