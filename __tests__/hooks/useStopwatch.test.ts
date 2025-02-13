import { useStopwatch } from "@/hooks/useStopwatch";
import { renderHook, waitFor } from "@testing-library/react";

jest.useFakeTimers();

describe("useStopwatch", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should have init value", async () => {
    const { result } = renderHook(() => useStopwatch());

    expect(result.current.elapsedTime).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  test("should start time", async () => {
    const { result } = renderHook(() => useStopwatch());
    result.current.start();
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(result.current.isRunning).toBe(true);
      expect(result.current.elapsedTime).toBeGreaterThanOrEqual(1000);
    });
  });

  test("should stop time", () => {
    const { result } = renderHook(() => useStopwatch());
    result.current.start();
    jest.advanceTimersByTime(2000);
    result.current.stop();

    const elapsedAfterStop = result.current.elapsedTime;

    jest.advanceTimersByTime(1000);

    expect(result.current.isRunning).toBe(false);
    expect(result.current.elapsedTime).toBe(elapsedAfterStop);
  });

  test("should reset time", () => {
    const { result } = renderHook(() => useStopwatch());
    result.current.reset();

    expect(result.current.isRunning).toBe(false);
    expect(result.current.elapsedTime).toBe(0);
  });
});
