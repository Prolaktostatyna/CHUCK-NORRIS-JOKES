import React, { useState, FunctionComponent, KeyboardEvent } from "react";
import "../css/save.css";

type SaveProps = {
  jokeCategory: string;
  impersonator: string;
  fetchData: (categoryArg: string, impersonatorArg: string) => Promise<string>;
};

export const Save: FunctionComponent<SaveProps> = ({
  jokeCategory,
  impersonator,
  fetchData,
}) => {
  let minNumber: number = 0;
  let maxNumber: number = 100;
  const [counter, setCounter] = useState<number>(0);

  const handleCounterBtn = (sign: string) => {
    if (sign === "-") {
      if (counter > minNumber) {
        setCounter(counter - 1);
      } else setCounter(minNumber);
    } else if (sign === "+") {
      if (counter < maxNumber) {
        setCounter(counter + 1);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  const handleSaveBtn = async () => {
    const arrayForJoke: string[] = [];
    if (counter > minNumber && counter <= maxNumber) {
      for (let i = 0; i < counter; i++) {
        arrayForJoke.push(await fetchData(jokeCategory, impersonator));
      }
      const fileData = arrayForJoke.join("\r\n");

      const blob = new Blob([fileData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "Jokes.txt";
      link.href = url;
      link.click();
    } else if (counter === 0) {
      alert("Enter the number of jokes you want to save");
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("klawisz");
    if (e.key === "Enter") {
      handleSaveBtn();
    }
  };

  //conditioncs for class names and limit alert:
  let classNamesSpan: string[] = [];
  let classNamesBackground: string[] = [];
  let classNameSaveBtn: string[] = [];
  let classNameLimitAlert: string[] = [];
  let limitMessage: string[] = [];

  if (counter === 0) {
    classNamesSpan.push("Btn");
    classNamesBackground.push("Gray");
    classNameSaveBtn.push("noActive");
    classNameLimitAlert.push("jokesInLimit");
    limitMessage.push("In limit");
  } else if (counter <= maxNumber) {
    classNamesSpan.push("BtnBold");
    classNamesBackground.push("Gray");
    classNameSaveBtn.push("active");
    classNameLimitAlert.push("jokesInLimit");
    limitMessage.push("In limit");
  } else if (counter > maxNumber) {
    classNamesSpan.push("BtnRed");
    classNamesBackground.push("Red");
    classNameSaveBtn.push("noActive");
    classNameLimitAlert.push("jokesAboveLimit");
    limitMessage.push("You can pick a number from 1 to 100");
  }

  return (
    <>
      <div className="wrapper">
        <div
          className={`backgroundCounter backgroundCounter${classNamesBackground}`}
        >
          <span
            className={`minus${classNamesSpan}`}
            onClick={() => handleCounterBtn("-")}
          >
            -
          </span>
          <input
            className="counter"
            type="number"
            onChange={(e) => setCounter(Number(e.target.value))}
            value={Number(counter).toString()}
            onKeyDown={handleKeyDown}
          />
          {/* <span className="counter"> {counter} </span> */}
          <span
            className={`plus${classNamesSpan}`}
            onClick={() => handleCounterBtn("+")}
          >
            +
          </span>
        </div>
        <button
          className={`saveStyle ${classNameSaveBtn}`}
          onClick={handleSaveBtn}
        >
          Save Jokes
        </button>
      </div>
      <p className={`${classNameLimitAlert}`}>{limitMessage}</p>
    </>
  );
};
