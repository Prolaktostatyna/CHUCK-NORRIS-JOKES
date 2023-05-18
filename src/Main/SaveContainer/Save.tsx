import React, { useState, FunctionComponent } from "react";

type SaveProps = {
  jokeCategory: string;
  impersonator: string;
};

export const Save: FunctionComponent<SaveProps> = ({
  jokeCategory,
  impersonator,
}) => {
  let minNumber = 0;
  let maxNumber = 10;
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

  const handleSaveBtn = () => {
    const arrayForJoke: string[] = [];
    for (let i = 0; i < counter; i++) {
      fetch("https://api.chucknorris.io/jokes/random").then((res) =>
        res.json().then((data) => {
          arrayForJoke.push(data.value);
        })
      );
    }
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
