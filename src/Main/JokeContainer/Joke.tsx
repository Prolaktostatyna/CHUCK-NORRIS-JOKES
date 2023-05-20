import React, { FunctionComponent } from "react";
import "../css/primary/primaryStyles.css";

type JokeProps = {
  joke: string;
};

export const Joke: FunctionComponent<JokeProps> = ({ joke }) => {
  //params: string
  return (
    <>
      <p className="Text-Style joke">"{joke}"</p>
    </>
  );
};
