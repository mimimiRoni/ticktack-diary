import Link from "next/link";
import styles from "./page.module.scss";
import Button from "@/components/common/Button/Button";
import { appName, appVersion } from "@/configs/appConfig";

/**
 * Home component
 * @returns The rendered component
 */
export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>{appName}</h1>
      <small>{appVersion}</small>
      <p>時間を記録して、モチベーションを上げよう！</p>
      <small>※現在開発中のため、これから機能が増えていきます！</small>
      <div>
        <Button>
          <Link href="/register">アカウント登録</Link>
        </Button>
        <Button variant="outline">
          <Link href="/login">ログイン</Link>
        </Button>
        <h2>機能</h2>
        <ul>
          <li>ストップウォッチで時間を測る！</li>
          <li>今月の時間記録のグラフが見られる！</li>
        </ul>
        <h3>追加予定の機能</h3>
        <ul>
          <li>任意の期間の時間記録のグラフ表示</li>
          <li>合計時間の表示</li>
          <ul>
            <li>1 日の合計時間</li>
            <li>1 週間の合計時間</li>
            <li>1 ヶ月の合計時間</li>
            <li>1 年の合計時間</li>
          </ul>
          <li>時間記録の編集</li>
          <li>時間記録の削除</li>
          <li>時間記録の手動追加</li>
        </ul>
      </div>
    </div>
  );
}
