"use client";

import LoginForm from "@/components/forms/LoginForm";
import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * ログインページを表示するコンポーネント
 * @returns ログインページの JSX 要素
 */
export default function Login() {
  // TODO: だいたい動作確認しやすいように設定。細かいところはまた見直す
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified === false) {
        router.push("/verify-email");
      } else if (user) {
        router.push("/timer");
      }
    });

    return () => unsubscribe();
  });

  return (
    <div>
      <h1>ログインページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページへ</Link>
      </button>
      <LoginForm />
    </div>
  );
}
