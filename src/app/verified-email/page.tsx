"use client";

import { auth } from "@/configs/firebaseConfig";
import { applyActionCode } from "firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * メールアドレス認証を完了するためのページを表示するコンポーネント
 * @returns メールアドレス認証を完了するためのページ JSX 要素
 */
export default function VerifiedEmail() {
  const urlParams = useSearchParams();
  const oobCode = urlParams.get("oobCode"); // URLパラメータからoobCodeを取得
  const router = useRouter();

  if (oobCode) {
    applyActionCode(auth, oobCode)
      .then(() => {
        router.push("/login");
      })
      .catch();
  }

  return (
    <div>
      <h1>メールアドレス認証を完了するためのページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページへ</Link>
      </button>
      <Suspense>
        {oobCode ? (
          <p>メールの認証を完了しています……</p>
        ) : (
          <div>
            <p>
              メールの認証に失敗しました。一度ログインすることで、認証メールの再送信ができます。
            </p>
            <button>
              <Link href="/login">ログインページへ</Link>
            </button>
          </div>
        )}
      </Suspense>
    </div>
  );
}
