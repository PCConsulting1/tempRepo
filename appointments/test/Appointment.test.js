import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

import { Appointment, AppointmentsDayView } from "../src/Appointment";

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

describe("AppointmentsDayView", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });
  it("renders an ordered list element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });
  it("renders a list item for each appointment", () => {
    const today = new Date();
    const twoAppointments = [
      { startsAt: today.setHours(12, 0) },
      { startsAt: today.setHours(13, 0) },
    ];
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });
  it("renders the time of each appointment", () => {
    const today = new Date();
    const twoAppointments = [
      { startsAt: today.setHours(12, 0) },
      { startsAt: today.setHours(13, 0) },
    ];
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });
});
