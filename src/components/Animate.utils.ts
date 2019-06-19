import { Duration } from "./Animate.types";

const durationFormat = /^(?<value>\d*\.?\d+)(?<unit>s|ms)?$/gi;
export const validateDuration = (duration: Duration): boolean => {
  switch (typeof duration) {
    case "number":
      return true;
    case "string":
      const matches = duration.match(durationFormat);

      if (matches === null) return false;
      switch (matches.length) {
        case 1:
        case 2:
          return true;
        default:
          return false;
      }
  }
};
