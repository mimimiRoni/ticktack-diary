"use client";

import Button from "@/components/common/Button/Button";
import { appOrigin } from "@/configs/appConfig";
import { auth } from "@/configs/firebaseConfig";
import { useLoggedInUser } from "@/hooks/auth/useLoggedInUser";
import { sendEmailVerification, signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

/**
 * メールアドレス認証ページを表示するコンポーネント
 * @returns メールアドレス認証ページの JSX 要素
 */
export default function VerifyEmail() {
  // TODO: 動作確認用のログアウト処理
  const logOutHandler = async () => {
    await signOut(auth);
  };

  // TODO: ざっくり動作確認程度なので、後ほど見直す
  const { loginUser } = useLoggedInUser();
  const [isSendedVerifyEmail, setSendedVerifyEmail] = useState(false);

  const sendedVerifyEmailHandler = async () => {
    try {
      if (loginUser) {
        await sendEmailVerification(loginUser, {
          url: `${appOrigin}/finish-register/`,
        });
        setSendedVerifyEmail(true);
      }
    } catch {}
  };

  return (
    <div>
      <h1>メールアドレス認証ページ</h1>
      <Button>
        <Link href="/">トップへ</Link>
      </Button>
      <Button>
        <Link href="/timer">時間計測ページへ</Link>
      </Button>
      <Button onClick={() => logOutHandler()}>ログアウト</Button>
      <p>
        {isSendedVerifyEmail === true
          ? "ご登録いただいたメールアドレスに、認証メールを送信しました！届かない場合は下の送信ボタンから再送信してください"
          : "ご登録いただいたメールアドレスに、認証メールを送信します。下の送信ボタンを押してください。"}
      </p>
      <p>認証メールのリンクにアクセスしてください。</p>
      <p>メールアドレスの認証が完了します。</p>
      <Button onClick={() => sendedVerifyEmailHandler()}>認証を送信</Button>
    </div>
  );
}
