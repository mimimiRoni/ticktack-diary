import SignUpForm from "@/components/forms/SignUpForm";
import Link from "next/link";

/**
 * アカウント登録ページを表示するコンポーネント
 * @returns アカウント登録ページの JSX 要素
 */
export default function Register() {
  return (
    <div>
      <h1>アカウント登録ページ</h1>
      <button>
        <Link href="/">トップへ</Link>
      </button>
      <button>
        <Link href="/verify-email">メール認証ページへ</Link>
      </button>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
