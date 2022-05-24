import React from "react";
import { Provider } from "react-redux";

import { configureStore } from "./Redux/DataflowStore";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <div>
    <Provider store={store}>
      {/* <ModuleHandler /> */}
      <App />
    </Provider>
  </div>,
  document.getElementById("root")
);
