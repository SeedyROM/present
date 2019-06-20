import * as React from "react";
import { render } from "@testing-library/react";

import Animate, {
  Keyframes,
  Elements,
  Tween,
} from "../../src/components/Animate";

const invalidTestMarkup = <Animate>broken</Animate>;
const validTestMarkup = (
  <Animate>
    <Keyframes>
      <Tween
        name="test"
        duration={300}
        to={{
          opacity: 1,
        }}
      />
    </Keyframes>
    <Elements>
      <div data-name="test">thinking about living</div>
    </Elements>
  </Animate>
);

describe("<Animate />", () => {
  describe("Test component structure validation", () => {
    it("should not render an invalid <Animate /> component", async () => {
      // LOL, just kill the error log for this test!
      const e = console.error;
      console.error = () => {};

      async function check() {
        await render(invalidTestMarkup);
      }
      await expect(check()).rejects.toThrow();

      // Reset console.error back to e
      console.error = e;
    });

    it("should render a valid <Animate /> component", async () => {
      await render(validTestMarkup);
    });
  });
});
