import React, { useEffect } from "react";

import { createStore, filterComponentsByType } from "../utils";
import {
  AnimateState,
  AnimateAction,
  KeyframesProps,
  ElementsProps,
  ContextProps,
} from "./Animate.types";

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
  // Our simple data store that will be injected into each component.
  const { Context, Provider } = createStore(
    animateReducer,
    animateInitialState
  );

  // Use this hook to set the correct inner components
  const [children, setChildren] = React.useState<any[]>([]);

  useEffect(() => {
    // Get amount of each required nested component
    const keyframes = filterComponentsByType(props.children, Keyframes);
    const elements = filterComponentsByType(props.children, Elements);

    // Throw errors if the component is setup incorrectly
    if (keyframes.length !== 1)
      throw new Error("Animate requires <Keyframes />");
    if (elements.length !== 1) throw new Error("Animate requires <Elements />");

    // Inject context into the nested components
    const KeyframesComponent = React.cloneElement(keyframes[0], {
      context: Context,
    });
    const ElementsComponent = React.cloneElement(elements[0], {
      context: Context,
    });

    // Update our state
    setChildren([KeyframesComponent, ElementsComponent]);
  }, []);

  return <Provider>{children}</Provider>;
};

export default Animate;
