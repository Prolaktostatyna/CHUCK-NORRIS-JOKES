import React, {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
} from "react";

type InputsProps = {
  setChuckImage: Dispatch<SetStateAction<boolean>>;
};

export const Inputs: FunctionComponent<InputsProps> = ({ setChuckImage }) => {
  const [impersonator, setImpersonator] = useState("Chuck Norris");

  const handleSetImpersonator = (value: string) => {
    if (value === "") {
      setImpersonator("Chuck Norris");
      setChuckImage(true);
    } else {
      setImpersonator(value);
    }
  };

  const handleImageChange = () => {
    if (impersonator === "Chuck Norris") {
      setChuckImage(true);
    } else setChuckImage(false);
  };

  return (
    <>
      <select>
        <option value="" disabled selected>
          Categories
        </option>
      </select>
      <input
        type="text"
        placeholder="Impersonate Chuck Norris"
        onChange={(e) => handleSetImpersonator(e.target.value)}
      ></input>
      <button onClick={handleImageChange}>
        Draw a random {impersonator} Joke
      </button>
    </>
  );
};
