import React, { useEffect } from "react";
import { createStore } from "../utils";

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
};

interface Frame {
  mutation: (...args: any[]) => any;
  duration: Duration;
}

interface AnimateState {
  frames: Frame[];
}

type AnimateAction = { type: "addFrame" | "removeFrame"; payload: Frame };

const animateInitialState: AnimateState = {
  frames: [],
};

const animateReducer = (state: AnimateState, action: AnimateAction) => {
  switch (action.type) {
    case "addFrame":
      return {
        frames: [...state.frames, action.payload],
      };
    default:
      return state;
  }
};

const filterComponentsByType = (elements: any, type: any) => {
  const asArray = React.Children.toArray(elements);
  const nullOrCorrectType = asArray.map(child => {
    if (!child) {
      return null;
    }
    return child.type === type ? child : null;
  });
  const filtered = nullOrCorrectType.filter(Boolean);
  return filtered;
};

export const Keyframes = () => <div>Keyframes</div>;
export const Elements = () => <div>Elements</div>;

const Animate: React.FC = props => {
  const { Context, Provider } = createStore(
    animateReducer,
    animateInitialState
  );

  const [children, setChildren] = React.useState<any[]>([]);

  useEffect(() => {
    const keyframes = filterComponentsByType(props.children, Keyframes);
    const elements = filterComponentsByType(props.children, Elements);

    if (keyframes.length !== 1)
      throw new Error("Animate requires <Keyframes />");
    if (elements.length !== 1) throw new Error("Animate requires <Elements />");

    const KeyframesComponent = React.cloneElement(keyframes[0], {
      context: Context,
    });
    const ElementsComponent = React.cloneElement(elements[0], {
      context: Context,
    });

    setChildren([KeyframesComponent, ElementsComponent]);
  }, []);

  return <Provider>{children}</Provider>;
};

export default Animate;
