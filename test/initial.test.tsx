import * as React from "react";
import * as ReactDOM from "react-dom";
import { renderHook, act } from "react-hooks-testing-library";
import { render, waitForElement } from "@testing-library/react";

import { Thing, useCounter } from "../src";

describe("test initial placeholder component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Thing />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("can read the components innerText correctly", async () => {
    const { getByText } = await render(<Thing />);
    await waitForElement(() => getByText(/i work/i));
  });
});

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
