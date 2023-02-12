import { ChangeEvent, useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = <T>(e: T) => {
    if (typeof e === "string") {
      setValue(e);
    } else {
      setValue((e as ChangeEvent<HTMLInputElement>).target.value);
    }
  };

  return { value, onChange };
};
