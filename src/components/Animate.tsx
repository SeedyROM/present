import React from "react";

// TODO: Implement context and hooks API
// import { createStore } from "utils";

type Duration = number | string;

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

  // switch(typeof duration) {
  //   case 'number':
  //     return durationFormat.test(duration.toString());
  //   case 'string':
  //     return durationFormat.test(duration);
  // }
};

// interface Frame {
//   mutation: (...args: any[]) => any;
//   duration: Duration;
// }

const Animate: React.FC = props => {
  return <>{props.children}</>;
};

export default Animate;
