import React from "react";
import Image from "./ImageContainer/Image";
import Inputs from "./InputsContainer/Inputs";
import Joke from "./JokeContainer/Joke";
import Save from "./SaveContainer/Save";

function Main() {
  return (
    <>
      <Image />
      <Joke />
      <Inputs />
      <Save />
    </>
  );
}
export default Main;
