import React from "react";
import {
  initializeReactContainer,
  render,
  field,
  form,
} from "./reactTestExtensions";
import { AppointmentForm } from "../src/AppointmentForm";

describe("AppointmentForm", () => {
  const blankAppointment = { service: "" };
  const services = ["Cut", "Blow-dry"];

  beforeEach(() => {
    initializeReactContainer();
  });

  const labelsOfAllOptions = (element) =>
    Array.from(element.childNodes, (node) => node.textContent);

  it("renders a form", () => {
    render(<AppointmentForm original={blankAppointment} />);
    expect(form()).not.toBeNull();
  });

  describe("service fields", () => {
    const findOption = (selectBox, textContent) => {
      const options = Array.from(selectBox.childNodes);
      return options.find((option) => option.textContent === textContent);
    };

    it("renders as a select box", () => {
      render(<AppointmentForm original={blankAppointment} />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName.toLowerCase()).toEqual("select");
    });

    it("has a blank value as the first value", () => {
      render(<AppointmentForm original={blankAppointment} />);
      const firstOption = field("service").childNodes[0];
      expect(firstOption.value).toEqual("");
    });

    it("lists all salon services", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          selectableServices={services}
        />
      );
      expect(labelsOfAllOptions(field("service"))).toEqual(
        expect.arrayContaining(services)
      );
    });

    it("pre-selects the existing value", () => {
      const appointment = { service: "Blow-dry" };
      render(
        <AppointmentForm selectableServices={services} original={appointment} />
      );
      const option = findOption(field("service"), "Blow-dry");
      expect(option.selected).toBe(true);
    });
  });
});
