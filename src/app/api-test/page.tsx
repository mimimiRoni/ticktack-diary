"use client";

import Button from "@/components/common/Button/Button";
import { auth } from "@/configs/firebaseConfig";
import { getIdToken } from "firebase/auth";
import { useState } from "react";

/**
 * APIのお試しページComponent
 * @returns The rendered component
 */
export default function APITest() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);
  const [responseJson, setResponseJson] = useState<string | null>(null);
  const onClick = async () => {
    setLoading(true);
    setResponse(null);
    setResponseJson(null);

    if (auth.currentUser === null) {
      return;
    }

    try {
      const token = await getIdToken(auth.currentUser);
      const response = await fetch("/api", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse(response);
      if (response.ok) {
        const json = await response.json();
        setResponseJson(JSON.stringify(json));
      } else {
        const json = await response.json();
        setResponseJson(`エラーが発生しました : ${JSON.stringify(json)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>APIのテストページ</h1>
      <Button onClick={onClick} disabled={loading}>
        fetch
      </Button>
      {response && (
        <div>
          <p>res ok?: {response.ok.toString()}</p>
          <p>
            status: {response.status} {response.statusText}
          </p>
          <p>url: {response.url}</p>
          {responseJson && <p>body: {responseJson}</p>}
        </div>
      )}
    </div>
  );
}
