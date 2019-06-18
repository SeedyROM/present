import React, { Dispatch, Reducer, Provider } from "react";

export const createStore = <S extends {}, A extends {}>(
  reducer: Reducer<S, A>,
  initialState: S
) => {
  const contextValues: [S, Dispatch<A>] = [initialState, action => {}];

  const Context = React.createContext<[S, Dispatch<A>]>(contextValues);

  const Provider: React.FC = (props: any) => {
    const store = React.useReducer(reducer, initialState);

    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };

  return { Context, Provider, Consumer: Context.Consumer };
};

export const withProvider: React.FC = (Provider: Provider<any>) => (
  Component: JSX.Element
) => (props: any) => (
  <Provider>
    <Component {...props} />
  </Provider>
);
