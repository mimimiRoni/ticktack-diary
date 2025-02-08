import Link from "next/link";

/**
 * メールアドレス認証ページを表示するコンポーネント
 * @returns メールアドレス認証ページの JSX 要素
 */
export default function VerifyEmail() {
  return (
    <div>
      <h1>メールアドレス認証ページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/timer">時間計測ページへ</Link>
      </button>
      {/* TODO: メール認証が完了したら、一度ログアウトさせて再度ログインさせるようにする */}
      <p>ご登録いただいたメールアドレスに、認証メールを送信しました！</p>
      <p>認証メールのリンクをクリックして、アクセスしてください。</p>
      <p>
        認証メールのリンクをクリックすることで、メールアドレスの認証が完了します。
      </p>
    </div>
  );
}
