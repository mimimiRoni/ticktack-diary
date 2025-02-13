import StopwatchComponent from "@/modules/timer/StopwatchComponent";
import { render, screen, fireEvent } from "@testing-library/react";
import { useStopwatch } from "@/hooks/useStopwatch";

jest.mock("@/hooks/useStopwatch");

describe("StopwatchComponent", () => {
  const mockUseStopwatch = useStopwatch as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    mockUseStopwatch.mockReturnValue({
      elapsedTime: 0,
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
      isRunning: false,
    });
  });

  test("should call start if button clicked", () => {
    render(<StopwatchComponent />);

    const startButton = screen.getByRole("button", { name: "Start" });

    expect(startButton).not.toBeNull();
  });

  test("should call start if start button is clicked", () => {
    const { start } = mockUseStopwatch();

    render(<StopwatchComponent />);

    const startButton = screen.getByRole("button", { name: "Start" });
    fireEvent.click(startButton);

    expect(start).toHaveBeenCalled();
  });

  test("should call stop if stop button is clicked", () => {
    mockUseStopwatch.mockReturnValue({
      elapsedTime: 1000,
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
      isRunning: true,
    });

    const { stop } = mockUseStopwatch();

    render(<StopwatchComponent />);

    const stopButton = screen.getByRole("button", { name: "Stop" });
    fireEvent.click(stopButton);

    expect(stop).toHaveBeenCalled();
  });

  test("should call reset if save button is clicked", () => {
    const { reset } = mockUseStopwatch();

    render(<StopwatchComponent />);

    const saveButton = screen.getByRole("button", { name: "Save as record" });
    fireEvent.click(saveButton);

    expect(reset).toHaveBeenCalled();
  });
});
