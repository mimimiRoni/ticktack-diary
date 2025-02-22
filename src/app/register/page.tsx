import Button from "@/components/common/Button/Button";
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
      <Button>
        <Link href="/">トップへ</Link>
      </Button>
      <Button>
        <Link href="/verify-email">メール認証ページへ</Link>
      </Button>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
