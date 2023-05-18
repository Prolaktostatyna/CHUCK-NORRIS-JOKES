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
};

export const Inputs: FunctionComponent<InputsProps> = ({
  setChuckImage,
  categories,
}) => {
  const [impersonator, setImpersonator] = useState("Chuck Norris");
  const [placeholder, setPlaceholder] = useState("Category");
  const [categoryFlag, setCategoryFlag] = useState(true);

  const selectRef = useRef<any>(null);

  //   useEffect(() => {
  //     document.addEventListener("click", (e) => {
  //       if (!selectRef.current.contains(e.target)) {
  //         setPlaceholder("Category");
  //       } else setPlaceholder("Select category");
  //     });
  //   }, []);

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
      setImpersonator("Chuck Norris");
      setChuckImage(true);
    } else {
      setImpersonator(value);
    }
  };

  //   const handleSetPlaceholder = () => {
  //     setPlaceholder("Select category");
  //   };

  const handleImageChange = () => {
    if (impersonator === "Chuck Norris") {
      setChuckImage(true);
    } else setChuckImage(false);
  };

  return (
    <>
      <select ref={selectRef}>
        <option value="1" label={placeholder} hidden>
          Categories
        </option>
        {categories.map((categoryElement, index) => {
          return <option key={index}>{categoryElement}</option>;
        })}
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
