import React, { FunctionComponent, KeyboardEvent } from "react";

type ReusableInputProps = {
  handleInputChange: (value: string) => any;
  inputValue: string;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => any;
};

export const ReusableInput: FunctionComponent<ReusableInputProps> = ({
  handleInputChange,
  inputValue,
  handleKeyDown,
}) => {
  return (
    <div className="inputWrapper">
      <input
        className={inputValue === "" ? "inputEmpty" : "inputFill"}
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      <span
        className={
          inputValue === "" ? "inputPlaceholderMiddle" : "inputPlaceholderUp"
        }
      >
        Impersonate Chuck Norris
      </span>
    </div>
  );
};
