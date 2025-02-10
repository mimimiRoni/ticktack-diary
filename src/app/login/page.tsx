"use client";

import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

/**
 * ログインページを表示するコンポーネント
 * @returns ログインページの JSX 要素
 */
export default function Login() {
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
