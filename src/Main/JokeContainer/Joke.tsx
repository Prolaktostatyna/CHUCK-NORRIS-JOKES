import React, { FunctionComponent } from "react";

type JokeProps = {
  joke: string;
};

export const Joke: FunctionComponent<JokeProps> = ({ joke }) => {
  //params: string
  return (
    <>
      <p>{joke}</p>
    </>
  );
};
