import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

import { Appointment } from "../src/Appointment";

/* Dictionary 

- it: defines a test and gives a description
- act: pauses tests until React component has rendered
- expect: defines a value that should be returned
- beforeEach: assigns or reassigns value to a variable before each test
 */

/* For React testing, give the describe block the same name as
the component itself, or the function name */

/*  Test Structure 
  Arrange - Set up test dependencies
  Act - Execute production code under test
  Assert - Check that expectations are met
*/
describe("Appointment", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Ashley");
  });
  //*tests must run independently from each other
  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Jordan");
  });
});
