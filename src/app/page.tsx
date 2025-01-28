"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../lib/firebaseConfig";

/**
 * Home component
 * @returns The rendered component
 */
export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignUp = () => {
    console.log("ユーザー登録処理");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log("ユーザー登録成功！", userCredential.user);
        alert("登録成功！メールアドレス：" + userCredential.user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <h1>ログイン機能作成お試し中……</h1>
      <h2>ユーザー登録</h2>
      <h3>メールアドレスとパスワードで登録</h3>
      <form>
        <p>メールアドレス</p>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        <p>パスワード</p>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </form>
      <button onClick={onClickSignUp}>登録</button>
      <h2>ログイン</h2>
    </div>
  );
}
