import React, { useState, FunctionComponent } from "react";
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
  let minNumber = 0;
  let maxNumber = 100;
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
  };

  return (
    <>
      <div className="wrapper">
        {counter === 0 ? (
          <div className="backgroundCounter">
            <span className="minusBtn" onClick={() => handleCounterBtn("-")}>
              -
            </span>
            <span className="counter"> {counter} </span>
            <span className="plusBtn" onClick={() => handleCounterBtn("+")}>
              +
            </span>
          </div>
        ) : counter > 0 && counter < minNumber ? (
          <div className="backgroundCounter">
            <span
              className="minusBtnBold"
              onClick={() => handleCounterBtn("-")}
            >
              -
            </span>
            <span className="counter"> {counter} </span>
            <span className="plusBtnBold" onClick={() => handleCounterBtn("+")}>
              +
            </span>
          </div>
        ) : (
          <div className="backgroundCounter">
            <span className="minusBtnRed" onClick={() => handleCounterBtn("-")}>
              -
            </span>
            <span className="counter"> {counter} </span>
            <span className="plusBtnRed" onClick={() => handleCounterBtn("+")}>
              +
            </span>
          </div>
        )}

        {counter === 0 ? (
          <button className="saveJokeBtnNull " onClick={handleSaveBtn}>
            Save Jokes
          </button>
        ) : (
          <button className="saveJokeBtnFill " onClick={handleSaveBtn}>
            Save Jokes
          </button>
        )}
      </div>
      {counter <= maxNumber ? (
        <p className="jokesInLimit">In limit</p>
      ) : (
        <p className="jokesAboveLimit">You can pick a number from 1 to 100</p>
      )}
    </>
  );
};
