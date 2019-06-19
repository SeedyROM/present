import * as React from "react";
import { render, cleanup } from "@testing-library/react";

import Animate, {
  validateDuration,
  Keyframes,
  Elements,
} from "../../src/components/Animate";

afterEach(cleanup);

const invalidTestMarkup = <Animate>broken</Animate>;
const validTestMarkup = (
  <Animate>
    <Keyframes></Keyframes>
    <Elements></Elements>
  </Animate>
);

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
    it("should not render an invalid <Animate /> component", async () => {
      // LOL, just kill the error log for this test!
      const e = console.error;
      console.error = () => {};

      async function check() {
        await render(invalidTestMarkup);
      }
      await expect(check()).rejects.toThrow();

      // Reset console.error back to i
      console.error = e;
    });

    it("should render a valid <Animate /> component", async () => {
      await render(validTestMarkup);
    });
  });
});
