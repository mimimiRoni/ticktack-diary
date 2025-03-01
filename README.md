[![codecov](https://codecov.io/gh/mimimiRoni/ticktack-diary/graph/badge.svg?token=JPI4WCI2RA)](https://codecov.io/gh/mimimiRoni/ticktack-diary)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://develop--67b860932a447967a0bffae2.chromatic.com)

---

学習がてら自分がほしいものを作ります。

[![TickTackDiary](https://img.shields.io/badge/TickTack_Diary-0a9691?style=flat)](https://ticktack-diary.homironi.com/)：https://ticktack-diary.homironi.com/

時間とメモを記録するアプリ。  
詳細はほぼNotion管理：https://tricolor-caravan-592.notion.site/TicktackDiary-187c163b13848090b79dda23169a9699

## エンドポイント

詳細は [API のドキュメント](/docs/api.md)へ

| リソース             | メソッド | エンドポイント   | 用途                                       |
| -------------------- | -------- | ---------------- | ------------------------------------------ |
| ユーザー追加         | POST     | /users           | ユーザーを追加                             |
| ユーザー削除         | DELETE   | /users           | ユーザーを削除                             |
| 時間カテゴリ追加     | POST     | /time/categories | ユーザー定義の時間カテゴリ追加             |
| 時間カテゴリ一覧     | GET      | /time/categories | ユーザーの定義した時間のカテゴリ一覧を取得 |
| 時間カテゴリ名変更   | PUT      | /time/categories | ユーザー定義の時間カテゴリ名変更           |
| 時間カテゴリ削除     | DELETE   | /time/categories | ユーザー定義の時間カテゴリ削除             |
| 時間記録追加         | POST     | /time/records    | ユーザーの時間記録追加                     |
| 時間記録一覧取得     | GET      | /time/records    | ユーザーの時間記録一覧を取得               |
| 時間記録変更         | PUT      | /time/records    | ユーザーの時間記録変更                     |
| 時間記録削除         | DELETE   | /time/records    | ユーザーの時間記録削除                     |
| デイリーコメント追加 | POST     | /daily/comments  | ユーザーのデイリーコメント追加             |
| デイリーコメント取得 | GET      | /daily/comments  | ユーザーのデイリーコメント一覧を取得       |
| デイリーコメント変更 | PUT      | /daily/comments  | ユーザーのデイリーコメント変更             |
| デイリーコメント削除 | DELETE   | /daily/comments  | ユーザーのデイリーコメント削除             |
