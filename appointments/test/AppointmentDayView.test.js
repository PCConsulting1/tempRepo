import React from "react";

import { Appointment, AppointmentsDayView } from "../src/AppointmentDayView";
import {
  initializeReactContainer,
  render,
  click,
  element,
  elements,
  textOf,
  typesOf,
} from "./reactTestExtensions";

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
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(document.body).toContainText("Ashley");
  });
  //*tests must run independently from each other
  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(document.body).toContainText("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  const secondButton = () => elements("button")[1];
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(element("div#appointmentsDayView")).not.toBeNull();
  });
  it("renders an ordered list element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(element("ol")).not.toBeNull();
  });
  it("renders a list item for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(elements("ol > li")).toHaveLength(2);
  });
  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);
  });
  it("shows a message if there are no appointments scheduled for that day", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });
  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(document.body).toContainText("Ashley");
  });
  it("has a button element in each list item", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(typesOf(elements("li > *"))).toEqual(["button", "button"]);
  });
  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    click(secondButton());
    expect(document.body).toContainText("Jordan");
  });
});
