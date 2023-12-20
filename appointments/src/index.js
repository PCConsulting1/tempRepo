import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentDayView";
import { sampleAppointments } from "./sampleData";
import { AppointmentForm } from "./AppointmentForm";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <AppointmentsDayView appointments={sampleAppointments} />
  <AppointmentForm
    original={{}}
    availableTimeSlots={sampleAvailableTimeSlots}
    appointments={sampleAppointments}
    onSubmit={() => {}}
  />
);
