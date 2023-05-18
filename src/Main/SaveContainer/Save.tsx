import React, { useState, FunctionComponent } from "react";

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
  const [counter, setCounter] = useState(0);

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
    console.log(arrayForJoke);
  };

  return (
    <>
      <div>
        <div className="counter">
          <span onClick={() => handleCounterBtn("-")}> - </span>
          <span> {counter} </span>
          <span onClick={() => handleCounterBtn("+")}> + </span>
        </div>
        <button onClick={handleSaveBtn}>Save</button>
      </div>
      {counter <= maxNumber ? (
        <p></p>
      ) : (
        <p>You can pick a number from 1 to 100</p>
      )}
    </>
  );
};
