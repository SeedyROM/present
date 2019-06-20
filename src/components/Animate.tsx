import React, { useEffect } from "react";

import { createStore, filterComponentsByType } from "../utils";
import {
  AnimateState,
  AnimateAction,
  KeyframesProps,
  Frame,
  // ElementsProps,
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

export const Tween: React.FC<Frame> = () => {
  return null;
};

export const Keyframes = (props: KeyframesProps & ContextProps) => {
  const [state, dispatch] = React.useContext(props.context!);

  useEffect(() => {
    const frameComponents = filterComponentsByType(props.children, Tween);

    console.log(props.context!);

    frameComponents.forEach((frameComponent: any) => {
      dispatch({
        action: "addFrame",
        payload: {
          duration: frameComponent.props,
        },
      });
    });

    console.log(state);
  });

  console.log(state);

  return null;
};

// props: ElementsProps & ContextProps
export const Elements = () => {
  return null;
};

const Animate: React.FC = props => {
  // Our simple data store that will be injected into each component.
  const { Context, Provider } = createStore(
    animateReducer,
    animateInitialState
  );

  // Use this hook to set the correct inner components
  const [children, setChildren] = React.useState<React.ReactNode>([]);

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
  });

  return <Provider>{children}</Provider>;
};

export default Animate;
