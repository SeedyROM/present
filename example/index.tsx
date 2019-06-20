import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Animate, { Keyframes, Elements, Tween } from "../src/components/Animate";

const App = () => {
  return (
    <div>
      <Animate>
        <Keyframes>
          <Tween
            name="test"
            duration={300}
            to={{
              opacity: 1,
            }}
          />
        </Keyframes>
        <Elements>
          <div name="test">the reason</div>
        </Elements>
      </Animate>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
