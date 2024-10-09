import React from "react";

import { DatePicker } from "@atlaskit/datetime-picker";

const DatePickerD = ({ setExpiryDate }) => (
  <>
    <DatePicker
      defaultValue={new Date().toISOString().slice(0, 10)}
      placeholder="Select a date"
      minDate={new Date().toISOString().slice(0, 10)}
      onChange={(date) => setExpiryDate(date)}
    />
  </>
);

export default DatePickerD;
