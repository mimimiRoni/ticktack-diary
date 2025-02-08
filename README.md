学習がてら自分がほしいものを作ります。

https://ticktack-diary.homironi.com/

時間とメモを記録するアプリ。

ざっくりTODO。詳細はNotionでメモ。

- [ ] ユーザー登録：メールアドレス＆パスワード
  - [x] メールアドレス＆パスワードの新規登録
  - [x] 仮登録ですよのデータをFirestoreに保存
  - [x] FirestoreでTTLを使って24時間経っても仮登録のままならFirestoreから削除されるように
  - [ ] Firestoreの仮ユーザーデータ削除に紐づいて、FirebaseAuth側のユーザーも削除
  - [x] メールアドレス認証メールの送信
  - [x] 「認証メール送信しました」ページに遷移
  - [ ] 既に登録済のとき
    - [ ] メールアドレス宛に「登録済みのこのメールアドレスでの登録が試みられたこと」やログインURLなどを送信
    - [ ] とりあえず通常時と同じように「認証メールを送信しました」ページにとばす
  - [ ] メールアドレス認証が完了したら、
    - [ ] 仮登録データは不要になるので削除
    - [ ] 一度ログアウトさせて再度ログインしてもらう
- [ ] ユーザー登録：Googleアカウント
  - [ ] 認証が完了したら、時間計測ページ（ログインして最初のページ）に飛ばす
- [ ] ユーザーログイン：メールアドレス＆パスワード
  - [ ] ログインに成功したら、時間計測ページ（ログインして最初のページ）に飛ばす
- [ ] ユーザーログイン：Googleアカウント
  - [ ] ログインに成功したら、時間計測ページ（ログインして最初のページ）に飛ばす
- [ ] 時間を測る：ストップウォッチ形式
- [ ] 時間を測る：ポモドーロちっくに休憩時間も設定できる形式
- [ ] 時間を記録する
- [ ] 記録済の時間を編集できるようにする
- [ ] 時間の記録の手動追加をできるようにする
- [ ] 記録のグラフを見られるようにする
  - [ ] 1ヶ月の日毎のグラフを見られるようにする
  - [ ] すべての記録の日毎のグラフを見られるようにする
  - [ ] 1ヶ月とすべての記録と切り替えで見られるようにする
- [ ] 1日に対するコメントを記録できるようにする
- [ ] 1日に対するコメントを閲覧できるようにする
- [ ] 1日に対するコメントを編集できるようにする
- [ ] メールアドレス＆パスワード ユーザー：メールアドレス変更
- [ ] メールアドレス＆パスワード ユーザー：パスワード変更
- [ ] メールアドレス＆パスワード ユーザー：Googleアカウントの連携
- [ ] Googleアカウント ユーザー：メールアドレス＆パスワードの追加登録
