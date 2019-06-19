import React, { useEffect } from "react";
import { createStore, filterComponentsByType } from "../utils";

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
  elements: React.ReactNode;
}

type AnimateAction = { type: "addFrame" | "removeFrame"; payload: Frame };

const animateInitialState: AnimateState = {
  frames: [],
  elements: [],
};

const animateReducer = (state: AnimateState, action: AnimateAction) => {
  switch (action.type) {
    case "addFrame":
      return {
        ...state,
        frames: [...state.frames, action.payload],
      };
    default:
      return state;
  }
};

interface ContextProps {
  context?: React.Context<any>;
}

interface KeyframesProps {
  children?: React.ReactNode;
}

interface ElementsProps {
  children?: React.ReactNode;
}

export const Keyframes: React.FC = (props: KeyframesProps & ContextProps) => {
  const [state] = React.useContext(props.context!);
  console.log(state);

  return <div>Keyframes</div>;
};

export const Elements: React.FC = (props: ElementsProps & ContextProps) => {
  const [state] = React.useContext(props.context!);
  console.log(state);

  return <div>Elements</div>;
};

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
