[![codecov](https://codecov.io/gh/mimimiRoni/ticktack-diary/graph/badge.svg?token=JPI4WCI2RA)](https://codecov.io/gh/mimimiRoni/ticktack-diary)

---

学習がてら自分がほしいものを作ります。

https://ticktack-diary.homironi.com/

時間とメモを記録するアプリ。  
詳細はほぼNotion管理：https://tricolor-caravan-592.notion.site/TicktackDiary-187c163b13848090b79dda23169a9699

## ざっくり機能TODO

詳細はNotionでメモ。  
知らないことばかりなので、まずはいろんなことを知るために機能を仮で入れていくことを優先する。

### ログイン周り

- [ ] ユーザー登録：メールアドレス＆パスワード
  - [x] メールアドレス＆パスワードの新規登録
  - [ ] メールアドレスとパスワードのバリデーションの条件をすべて表示しておくようにする
  - [x] メールアドレス認証メールの送信
  - [x] 「認証メールを送信する」ページに遷移
  - [x] 認証完了後は「登録完了する」ページに遷移
    - [x] ログインしてて、メールアドレス未認証なら、認証メール送信ページへ（直接飛んできたとき対策）
    - [x] ログアウト
    - [x] ログインページに飛ばす（再ログインしてもらう）
  - [ ] 既に登録済のとき
    - [ ] メールアドレス宛に「登録済みのこのメールアドレスでの登録が試みられたこと」やログインURLなどを送信
    - [x] とりあえず通常時と同じように「認証メールを送信する」ページにとばす
- [ ] ユーザー登録：Googleアカウント
  - [ ] 認証が完了したら、時間計測ページ（ログインして最初のページ）に飛ばす
- [x] ユーザーログイン：メールアドレス＆パスワード
  - [x] ログインに成功したら、時間計測ページ（ログインして最初のページ）に飛ばす
- [ ] ユーザーログイン：Googleアカウント
  - [ ] ログインに成功したら、時間計測ページ（ログインして最初のページ）に飛ばす
- [x] ログインが必要なページでログインしていなければ、ログインページに飛ばす
- [x] ログインしているが、メールアドレス認証未完了の場合は、メールアドレス認証メール送信ページに飛ばす
- [ ] アクションURLの設定
  - [ ] メールアドレス確認
  - [ ] パスワード再設定
  - [ ] メールアドレス変更
- [ ] メールアドレス＆パスワード ユーザー：メールアドレス変更
- [ ] メールアドレス＆パスワード ユーザー：パスワード変更
- [ ] メールアドレス＆パスワード ユーザー：Googleアカウントの連携
- [ ] Googleアカウント ユーザー：メールアドレス＆パスワードの追加登録

### 機能周り

- [x] 時間を測る：ストップウォッチ形式
- [ ] 時間を測る：ポモドーロちっくに休憩時間も設定できる形式
- [x] 時間を記録する
- [ ] 記録済の時間を編集できるようにする
- [ ] 時間の記録の手動追加をできるようにする
- [ ] 合計時間の表示
  - [ ] 1日の合計時間
  - [ ] 1ヶ月の合計時間
  - [ ] 1年の合計時間
- [ ] 記録のグラフを見られるようにする
  - [x] Firestoreに保存した今月のグラフを見られるようにする
  - [ ] 任意の1ヶ月の日毎のグラフを見られるようにする
    - [ ] 見る月の選択をできるようにする→こんな感じで左右ぽちぽち＜＞
  - [ ] 1年間の日毎のグラフを見られるようにする
  - [ ] 1ヶ月と1年間の記録と切り替えて見られるようにする
- [ ] 1日に対するコメントを記録できるようにする
- [ ] 1日に対するコメントを閲覧できるようにする
- [ ] 1日に対するコメントを編集できるようにする
