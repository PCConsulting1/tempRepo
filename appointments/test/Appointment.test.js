import React from "react";
import ReactDOM from "react-dom/client";

import { Appointment } from "../src/Appointment";

/* For React testing, give the describe block the same name as
the component itself, or the function name */
describe("Appointment", () => {
  //define a test and a description
  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.createRoot(container).render(component);
    expect(document.body.textContent).toContain("Ashley");
  });
});
