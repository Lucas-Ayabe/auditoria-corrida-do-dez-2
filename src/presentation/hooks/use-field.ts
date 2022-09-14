import React, { useState } from "react";

export const useTextField = (defaultText = "") => {
  const [value, setValue] = useState(defaultText);
  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(event?.target.value),
  };
};

export const useNumberField = (defaultValue = 0) => {
  const [value, setValue] = useState(defaultValue);
  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(event?.target.valueAsNumber),
  };
};
