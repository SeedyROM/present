import * as React from "react";
import { render, waitForElement, cleanup } from "@testing-library/react";

// import { renderHook, act } from "react-hooks-testing-library";
import Animate, { validateDuration } from "../../src/components/Animate";

afterEach(cleanup);

const testMarkup = <Animate>hello</Animate>;

describe("test animate component", () => {
  describe("test duration calculations", () => {
    it("should accept valid integers", () => {
      const validDuration = validateDuration(200);
      expect(validDuration).toEqual(true);
    });

    it("should accept valid strings", () => {
      const validDuration = validateDuration("200");
      expect(validDuration).toEqual(true);
    });

    it("should not accept invalid strings", () => {
      const validDuration = validateDuration("1337fake");
      expect(validDuration).toEqual(false);
    });
  });

  describe("testing initial implementation", () => {
    it("should render the <Animate /> component", async () => {
      const component = await render(testMarkup);

      await waitForElement(() => component.getByText(/hello/i));
    });
  });
});
