import React from "react";

export type Duration = number | string;

export interface Frame {
  duration: Duration;
}

export interface AnimateState {
  frames: Frame[];
  elements: React.ReactNode;
}

export type AnimateAction = {
  type: "addFrame" | "removeFrame";
  payload: Frame;
};

export interface ContextProps {
  context?: React.Context<any>;
}

export interface KeyframesProps {
  children?: React.ReactNode;
}

export interface ElementsProps {
  children?: React.ReactNode;
}
