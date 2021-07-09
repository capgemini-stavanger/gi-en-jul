import * as React from "react";
import * as ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

it("renders without crashing", () => {
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    document.createElement("div")
  );
});
