import React, {
  FunctionComponent,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
  useRef,
} from "react";

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

  const handleImageChange = () => {
    console.log(impersonator);
    if (jokeCategory !== "") {
      fetch(`https://api.chucknorris.io/jokes/random?category=${jokeCategory}`)
        .then((res) => res.json())
        .then((data) => {
          if (impersonator === "") {
            setJoke(data.value);
          } else {
            let replaceImpresonator = data.value.replaceAll(
              "Chuck Norris",
              impersonator
            );
            setJoke(replaceImpresonator);
          }
        });
    } else {
      fetch(`https://api.chucknorris.io/jokes/random`)
        .then((res) => res.json())
        .then((data) => {
          if (impersonator === "") {
            setJoke(data.value);
          } else {
            let replaceImpresonator = data.value.replaceAll(
              "Chuck Norris",
              impersonator
            );
            setJoke(replaceImpresonator);
          }
        });
    }

    if (impersonator === "") {
      setChuckImage(true);
    } else setChuckImage(false);
    handleSetImpersonator("");
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
    </>
  );
};
