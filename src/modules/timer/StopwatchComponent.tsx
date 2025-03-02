"use client";

import Button from "@/components/common/Button/Button";
import { useLoggedInUser } from "@/hooks/auth/useLoggedInUser";
import { useStopwatch } from "@/hooks/useStopwatch";
import { addTimeRecord } from "@/lib/saveTimeRecord";
import { useState } from "react";

const StopwatchComponent = () => {
  const { loginUser } = useLoggedInUser();
  const { elapsedTime, startTime, start, stop, reset, isRunning } =
    useStopwatch();

  const [record, setRecord] = useState<string | null>(null);
  const handleOnRecord = async () => {
    if (!loginUser) {
      return;
    }

    stop();

    // TODO: 動作確認用に一旦おいておく
    const recordTime = formatTime(elapsedTime);
    const startedTime = new Date(startTime).toLocaleString("ja-JP");
    setRecord(`record ${recordTime} ${startedTime} ～`);
    reset();

    // TODO: カテゴリIDを設定できるようにする
    // TODO: デフォルトカテゴリの追加を何処かでする
    await addTimeRecord(
      loginUser,
      "00000000-0000-0000-0000-000000000000",
      new Date(startTime),
      elapsedTime,
    );
  };

  return (
    <div>
      <p>{elapsedTime} ms</p>
      {isRunning ? (
        <Button onClick={stop}>Stop</Button>
      ) : (
        <Button onClick={start}>Start</Button>
      )}
      <Button onClick={handleOnRecord}>Save as record</Button>
      {/* TODO: 確認しやすいようにしばらく表示しておく */}
      <p>{record}</p>
    </div>
  );
};

export default StopwatchComponent;

/**
 * ミリ秒を "hh:mm:ss" 形式の文字列にフォーマットする関数
 * @param ms - フォーマットするミリ秒
 * @returns フォーマットされた時間の文字列
 * @todo 時間に関するUtilityメソッドとしてファイル分けする
 */
function formatTime(ms: number) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return [hours, minutes, seconds]
    .map((unit) => unit.toString().padStart(2, "0"))
    .join(":");
}
