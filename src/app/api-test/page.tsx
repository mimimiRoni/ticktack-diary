"use client";

import Button from "@/components/common/Button/Button";
import { useState } from "react";

/**
 * APIのお試しページComponent
 * @returns The rendered component
 */
export default function APITest() {
  const [response, setResponse] = useState<Response | null>(null);
  const [responseJson, setResponseJson] = useState<string | null>(null);
  const onClick = async () => {
    setResponse(null);
    setResponseJson(null);

    const response = await fetch("/api");
    setResponse(response);
    if (response.ok) {
      const json = await response.json();
      setResponseJson(JSON.stringify(json));
    }
  };

  return (
    <div>
      <h1>APIのテストページ</h1>
      <Button onClick={onClick}>fetch</Button>
      {response && (
        <div>
          <p>status: {response.status}</p>
          <p>url: {response.url}</p>
          {responseJson && <p>body: {responseJson}</p>}
        </div>
      )}
    </div>
  );
}
