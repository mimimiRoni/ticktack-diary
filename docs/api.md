# API Documentation

- [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
  - [ユーザー](#ユーザー)
    - [ユーザー登録：`POST /users`](#ユーザー登録post-users)
    - [ユーザー削除：`DELETE /users`](#ユーザー削除delete-users)
  - [時間カテゴリ](#時間カテゴリ)
    - [時間カテゴリ作成：`POST /time/categories`](#時間カテゴリ作成post-timecategories)
    - [時間カテゴリ取得：`GET /time/categories`](#時間カテゴリ取得get-timecategories)
    - [時間カテゴリ名変更：`PUT /time/categories`](#時間カテゴリ名変更put-timecategories)
    - [時間カテゴリ削除：`DELETE /time/categories`](#時間カテゴリ削除delete-timecategories)
  - [時間記録エンドポイント](#時間記録エンドポイント)
    - [時間記録作成：`POST /time/records`](#時間記録作成post-timerecords)
    - [時間記録取得：`GET /time/records`](#時間記録取得get-timerecords)
    - [時間記録編集：`PUT /time/records`](#時間記録編集put-timerecords)
    - [時間記録削除：`DELETE /time/records`](#時間記録削除delete-timerecords)
  - [デイリーコメントエンドポイント](#デイリーコメントエンドポイント)
    - [コメント作成：`POST /daily/comments`](#コメント作成post-dailycomments)
    - [コメント取得：`GET /daily/comments`](#コメント取得get-dailycomments)
    - [コメント変更：`PUT /daily/comments`](#コメント変更put-dailycomments)
    - [コメント削除：`DELETE /daily/comments`](#コメント削除delete-dailycomments)

## Base URL

```
/api
```

## Authentication

すべてのエンドポイントは Firebase Authentication による認証が必要です。  
クライアントは Firebase の ID トークンを取得し、`Authorization` ヘッダーに `Bearer <token>` 形式で含めてリクエストを送信してください。

---

## ユーザー

### ユーザー登録：`POST /users`

ユーザーが Firebase Authentication でサインアップした際に `users` テーブルに `uid` を登録します。

**Request:**

```http
POST /users
Authorization: Bearer <token>
```

**Response:**

```json
{
  "uid": "登録されたuid"
}
```

**処理内容:**

- `uid` が `users` に存在しない場合は登録
- 既に `users` に存在する場合は何もしない（200 OK）

### ユーザー削除：`DELETE /users`

ユーザーがアカウントを削除した際に `users` テーブルから `uid` を削除し、ユーザーのデータを削除します。

**Request:**

```http
DELETE /users
Authorization: Bearer <token>
```

**Response:**

```json
{
  "id": "削除したuid"
}
```

**処理内容:**

- `uid` が `users` に存在しない場合は何もしない

---

## 時間カテゴリ

### 時間カテゴリ作成：`POST /time/categories`

新しい時間カテゴリを作成します。

**Request:**

```http
POST /time/categories
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "仕事"
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "仕事"
}
```

**処理内容:**

- `name` を指定して `time_categories` に新しいカテゴリを作成

### 時間カテゴリ取得：`GET /time/categories`

時間カテゴリ一覧を取得します。

**Request:**

```http
GET /time/categories?id=<UUID>
Authorization: Bearer <token>
```

| パラメータ | 型   | 必須 | 説明                   |
| ---------- | ---- | ---- | ---------------------- |
| id         | UUID | ❌   | 指定したカテゴリを取得 |

※引数は任意です。  
指定されない場合はすべてのカテゴリを返します。

**Response:**

```json
{
    {
        "id": "uuid",
        "name": "仕事"
    },
    {
        "id": "uuid",
        "name": "読書"
    }
}

```

**処理内容:**

- ユーザーの定義した時間カテゴリの一覧を取得します。

### 時間カテゴリ名変更：`PUT /time/categories`

時間カテゴリ名を変更します。

**Request:**

```http
PUT /time/categories
Content-Type: application/json
Authorization: Bearer <token>

{
  "id": "変更したいカテゴリの uuid",
  "name": "仕事",
}
```

**Response:**

```json
{
  "id": "変更したカテゴリの uuid",
  "name": "仕事"
}
```

**処理内容:**

- ユーザーの定義した時間カテゴリの名前を変更します。

### 時間カテゴリ削除：`DELETE /time/categories`

指定の時間カテゴリを削除します。

**Request:**

```http
POST /time/categories?id=<カテゴリUUID>
Content-Type: application/json
Authorization: Bearer <token>
```

| パラメータ | 型   | 説明                   |
| ---------- | ---- | ---------------------- |
| id         | UUID | このidのカテゴリを削除 |

※引数は必須です。

**Response:**

```json
{
  "id": "変更したカテゴリの uuid"
}
```

**処理内容:**

- 指定した時間カテゴリを削除します。

---

## 時間記録エンドポイント

### 時間記録作成：`POST /time/records`

新しい時間記録を作成します。

**Request:**

```http
POST /time/records
Content-Type: application/json
Authorization: Bearer <token>

{
  "category_id": "uuid",
  "started_at": "2024-02-26T10:00:00Z",
  "duration_ms": 3600000
}
```

**Response:**

```json
{
  "id": 1,
  "category_id": "uuid",
  "started_at": "2024-02-26T10:00:00Z",
  "duration_ms": 3600000
}
```

**処理内容:**

- `category_id` に紐づく時間記録を追加
- `started_at` と `duration_ms` を保存

### 時間記録取得：`GET /time/records`

ユーザーの時間記録を取得します。

**Request:**

```http
GET ?category-id=<UUID>&start-date=<YYYY-MM-DD>&end-date=<YYYY-MM-DD>
Authorization: Bearer <token>
```

| パラメータ  | 型   | 必須 | 説明                                           |
| ----------- | ---- | ---- | ---------------------------------------------- |
| category-id | UUID | ❌   | 指定したカテゴリの時間記録のみ取得             |
| start-date  | 日付 | ❌   | この日付以降の時間記録を取得（例: 2024-01-01） |
| end-date    | 日付 | ❌   | この日付以前の時間記録を取得（例: 2024-01-31） |

※ すべてのクエリパラメータは省略可能です。
何も指定しない場合は全ての時間記録が取得されます。

**Response:**

```json
{
    {
        "id": 1,
        "category_id": "uuid",
        "started_at": "2024-02-26T10:00:00Z",
        "duration_ms": 3600000
    },
    {
        "id": 1,
        "category_id": "uuid",
        "started_at": "2024-02-26T10:00:00Z",
        "duration_ms": 3600000
    },
}
```

**処理内容:**

- 指定の時間記録取得。

### 時間記録編集：`PUT /time/records`

時間記録の内容を変更します。

**Request:**

```http
PUT /time/records
Content-Type: application/json
Authorization: Bearer <token>

{
  "id": 1,
  "category_id": "uuid",
  "started_at": "2024-02-26T10:00:00Z",
  "duration_ms": 3600000
}
```

**Response:**

```json
{
  "id": 1,
  "category_id": "uuid",
  "started_at": "2024-02-26T10:00:00Z",
  "duration_ms": 3600000
}
```

**処理内容:**

- 指定の時間記録の内容を変更します。

### 時間記録削除：`DELETE /time/records`

指定のidの時間記録を削除します。

**Request:**

```http
DELETE /time/records?id=<UUID>
Content-Type: application/json
Authorization: Bearer <token>
```

| パラメータ | 型   | 説明                   |
| ---------- | ---- | ---------------------- |
| id         | UUID | このidのカテゴリを削除 |

※引数は必須です。

**Response:**

```json
{
  "id": "削除した時間記録のid"
}
```

**処理内容:**

- 指定のidの時間記録を削除

---

## デイリーコメントエンドポイント

### コメント作成：`POST /daily/comments`

日ごとのコメントを追加します。

**Request:**

```http
POST /daily/comments
Content-Type: application/json
Authorization: Bearer <token>

{
  "date": "2024-02-26",
  "comment": "今日は集中して作業できた！"
}
```

**Response:**

```json
{
  "id": "uuid",
  "date": "2024-02-26",
  "comment": "今日は集中して作業できた！"
}
```

**処理内容:**

- `date` ごとに `uid` に紐づくコメントを保存
- `comment` を記録

### コメント取得：`GET /daily/comments`

日ごとのコメントを取得します。

**Request:**

```http
GET /daily/comments?start-date=<YY-MM-DD>&end-date=<YY-MM-DD>
Authorization: Bearer <token>
```

| パラメータ | 型   | 必須 | 説明                                           |
| ---------- | ---- | ---- | ---------------------------------------------- |
| start-date | 日付 | ❌   | この日付以降のコメントを取得（例: 2024-01-01） |
| end-date   | 日付 | ❌   | この日付以前のコメントを取得（例: 2024-01-31） |

※ すべてのクエリパラメータは省略可能です。
何も指定しない場合は全てのコメントが取得されます。

**Response:**

```json
{
    {
        "id": "uuid",
        "date": "2024-02-26",
        "comment": "今日は集中して作業できた！"
    },
    {
        "id": "uuid",
        "date": "2024-02-26",
        "comment": "今日は集中して作業できた！"
    },
}
```

**処理内容:**

- 指定のコメントを取得

### コメント変更：`PUT /daily/comments`

日ごとのコメント内容を変更します。

**Request:**

```http
PUT /daily/comments
Content-Type: application/json
Authorization: Bearer <token>

{
  "date": "2024-02-26",
  "comment": "今日は集中して作業できた！"
}
```

**Response:**

```json
{
  "id": "uuid",
  "date": "2024-02-26",
  "comment": "今日は集中して作業できた！"
}
```

**処理内容:**

- 指定の日付のコメント内容を変更

### コメント削除：`DELETE /daily/comments`

指定の日付のコメントを削除します。

**Request:**

```http
DELETE /daily/comments?date=<YYYY-MM-DD>
Authorization: Bearer <token>
```

| パラメータ | 型   | 説明                                       |
| ---------- | ---- | ------------------------------------------ |
| date       | 日付 | この日付のコメントを削除（例: 2024-01-01） |

※引数は必須です。

**Response:**

```json
{
  "id": "削除したコメントのid"
}
```

**処理内容:**

- 指定の日付のコメントを削除
