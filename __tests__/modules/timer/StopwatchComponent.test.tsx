import StopwatchComponent from "@/modules/timer/StopwatchComponent";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useStopwatch } from "@/hooks/useStopwatch";
import { addTimeRecord } from "@/lib/saveTimeRecord";
import { useLoggedInUser } from "@/hooks/auth/useLoggedInUser";

jest.mock("@/hooks/useStopwatch");
jest.mock("@/lib/saveTimeRecord");

jest.mock("@/hooks/auth/useLoggedInUser", () => ({
  useLoggedInUser: jest.fn(),
}));

const mockId = "mocked-uid";
const mockUseLoggedInUser = useLoggedInUser as jest.Mock;

describe("StopwatchComponent", () => {
  const mockUseStopwatch = useStopwatch as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
    mockUseStopwatch.mockReturnValue({
      elapsedTime: 0,
      startTime: 0,
      start: jest.fn(),
      stop: jest.fn(),
      reset: jest.fn(),
      isRunning: false,
    });
    mockUseLoggedInUser.mockReturnValue({
      loginUser: { uid: mockId },
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

  test("should call reset if save button is clicked", async () => {
    const { reset } = mockUseStopwatch();

    render(<StopwatchComponent />);

    const saveButton = screen.getByRole("button", { name: "Save as record" });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(reset).toHaveBeenCalled();
    });
  });

  test("should not call addRecord if save button is clicked", () => {
    mockUseLoggedInUser.mockReturnValue({ loginUser: null });
    render(<StopwatchComponent />);

    const saveButton = screen.getByRole("button", { name: "Save as record" });
    fireEvent.click(saveButton);

    expect(addTimeRecord).not.toHaveBeenCalled();
  });

  test("should call addRecord if save button is clicked", () => {
    render(<StopwatchComponent />);

    const saveButton = screen.getByRole("button", { name: "Save as record" });
    fireEvent.click(saveButton);

    expect(addTimeRecord).toHaveBeenCalled();
  });
});
