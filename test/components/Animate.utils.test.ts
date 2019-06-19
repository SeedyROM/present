import { validateDuration } from "../../src/components/Animate.utils";

describe("validateDuration utility", () => {
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
