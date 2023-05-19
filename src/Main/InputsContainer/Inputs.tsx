import React, {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import { Save } from "../SaveContainer/Save";
import "../css/inputs.css";

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
  const [placeholder, setPlaceholder] = useState<string>("Categories");
  const [categoryFlag, setCategoryFlag] = useState<boolean>(true); //hook for handle double click on select
  const [jokeCategory, setJokeCategory] = useState<string>("");

  const selectRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!selectRef.current.contains(e.target) || !categoryFlag) {
        setCategoryFlag(true);
        setPlaceholder("Categories");
      } else if (categoryFlag) {
        setCategoryFlag(false);
        setPlaceholder("Select category");
      }
    });
  }, [categoryFlag]);

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
          `https://api.chucknorris.io/jokes/random?category=${categoryArg}`
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
      <select
        className="selectCategory"
        ref={selectRef}
        value={jokeCategory}
        onChange={(e) => {
          setJokeCategory(e.target.value);
        }}
      >
        <option
          className="optionCategoriesPlaceholder"
          value="1"
          label={placeholder}
          hidden
        ></option>
        {categories.map((categoryElement, index) => {
          return (
            <option
              className="optionCategories"
              key={index}
              value={categoryElement}
            >
              {categoryElement}
            </option>
          );
        })}
      </select>
      <div className="inputWrapper">
        {impersonator === "" ? (
          <input
            className="inputImpersonatorEmpty"
            type="text"
            // placeholder="Impersonate Chuck Norris"
            value={impersonator}
            onChange={(e) => handleSetImpersonator(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
        ) : (
          <input
            className="inputImpersonatorFill"
            type="text"
            // placeholder="Impersonate Chuck Norris"
            value={impersonator}
            onChange={(e) => handleSetImpersonator(e.target.value)}
            onKeyDown={handleKeyDown}
          ></input>
        )}
        {impersonator === "" ? (
          <span className="inputImpersonatorMiddle">
            Impersonate Chuck Norris
          </span>
        ) : (
          <span className="inputImpersonatorUp">Impersonate Chuck Norris</span>
        )}
      </div>

      {impersonator === "" ? (
        <button className="buttonDrawJoke" onClick={handleImageChange}>
          Draw a random Chuck Norris joke
        </button>
      ) : (
        <button className="buttonDrawJoke" onClick={handleImageChange}>
          Draw a random {impersonator} joke
        </button>
      )}
      <Save
        jokeCategory={jokeCategory}
        impersonator={impersonator}
        fetchData={fetchData}
      />
    </div>
  );
};
