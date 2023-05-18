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
  const [impersonator, setImpersonator] = useState("");
  const [placeholder, setPlaceholder] = useState("Category");
  const [categoryFlag, setCategoryFlag] = useState(true); //hook for handle double click on select
  const [jokeCategory, setJokeCategory] = useState("");

  const selectRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!selectRef.current.contains(e.target) || !categoryFlag) {
        setCategoryFlag(true);
        setPlaceholder("Category");
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
    <>
      <select
        ref={selectRef}
        value={jokeCategory}
        onChange={(e) => {
          setJokeCategory(e.target.value);
        }}
      >
        <option value="1" label={placeholder} hidden>
          Categories
        </option>
        {categories.map((categoryElement, index) => {
          return (
            <option key={index} value={categoryElement}>
              {categoryElement}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Impersonate Chuck Norris"
        value={impersonator}
        onChange={(e) => handleSetImpersonator(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      {impersonator === "" ? (
        <button onClick={handleImageChange}>
          Draw a random Chuck Norris joke
        </button>
      ) : (
        <button onClick={handleImageChange}>
          Draw a random {impersonator} joke
        </button>
      )}
      <Save
        jokeCategory={jokeCategory}
        impersonator={impersonator}
        fetchData={fetchData}
      />
    </>
  );
};
