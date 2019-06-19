import React, { Dispatch, Reducer } from "react";

export const createStore = <S extends {}, A extends {}>(
  reducer: Reducer<S, A>,
  initialState: S
) => {
  const dummyAction = () => {};
  const contextValues: [S, Dispatch<A>] = [initialState, dummyAction];

  const Context = React.createContext<[S, Dispatch<A>]>(contextValues);

  const Provider: React.FC = (props: any) => {
    const store = React.useReducer(reducer, initialState);

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };

  return { Context, Provider, Consumer: Context.Consumer };
};

export const withProvider: any = (Provider: any) => (Component: any) => (
  props: any
) => (
  <Provider>
    <Component {...props} />
  </Provider>
);
