import React, {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
  KeyboardEvent,
} from "react";
import { Save } from "../SaveContainer/Save";
import { ReusableInput } from "../../ReusableComponents/ReusableInput";
import { ReusableSelect } from "../../ReusableComponents/ReusableSelect";
import "../css/inputs.css";
import "../css/primary/primaryInputStyles.css";
import "../css/primary/primarySelectStyles.css";

type InputsProps = {
  setChuckImage: Dispatch<SetStateAction<boolean>>;
  categories: string[];
  setJoke: Dispatch<SetStateAction<string>>;
};

export const Inputs: FunctionComponent<InputsProps> = ({
  setChuckImage,
  categories,
  setJoke,
}) => {
  const [impersonator, setImpersonator] = useState<string>("");
  const [jokeCategory, setJokeCategory] = useState<string>("");

  const handleSetImpersonator = (value: string) => {
    if (value === "") {
      setImpersonator("");
      setChuckImage(true);
    } else {
      setImpersonator(value);
    }
  };

  //Create reusable async/await function:
  async function fetchData(
    categoryArg: string,
    impersonatorArg: string
  ): Promise<string> {
    try {
      if (categoryArg !== "") {
        const resp = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${categoryArg.toLowerCase()}`
        );
        const data = await resp.json();

        if (impersonatorArg === "") {
          return data.value;
        } else {
          let replaceImpresonator = await data.value.replaceAll(
            "Chuck Norris",
            impersonatorArg
          );
          return replaceImpresonator;
        }
      } else {
        const resp = await fetch(`https://api.chucknorris.io/jokes/random`);
        const data = await resp.json();
        if (impersonatorArg === "") {
          return data.value;
        } else {
          let replaceImpresonator = data.value.replaceAll(
            "Chuck Norris",
            impersonatorArg
          );
          return replaceImpresonator;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const handleImageChange = async () => {
    setJoke(await fetchData(jokeCategory, impersonator));
    if (impersonator === "") {
      setChuckImage(true);
    } else setChuckImage(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleImageChange();
    }
  };

  return (
    <div className="inputs">
      <ReusableSelect
        dropdownOptions={categories}
        setValue={setJokeCategory}
        placeholderOptions={"Categories"}
        placeholderSelect={"Select category"}
      />
      <ReusableInput
        handleInputChange={handleSetImpersonator}
        inputValue={impersonator}
        handleKeyDown={handleKeyDown}
      />
      <button className="buttonDrawJoke" onClick={handleImageChange}>
        {impersonator === ""
          ? "Draw a random Chuck Norris Joke"
          : `Draw a random ${impersonator} Joke`}
      </button>

      <Save
        jokeCategory={jokeCategory}
        impersonator={impersonator}
        fetchData={fetchData}
      />
    </div>
  );
};
