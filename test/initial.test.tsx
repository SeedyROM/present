import { renderHook, act } from "react-hooks-testing-library";

import { useCounter } from "../src";

describe("test placeholder hooks", () => {
  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.increment());

    expect(result.current.count).toBe(1);
  });

  it("should decrement counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.decrement());

    expect(result.current.count).toBe(-1);
  });
});
