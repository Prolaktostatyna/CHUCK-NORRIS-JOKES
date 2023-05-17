import React, { useState } from "react";
import { Image } from "./ImageContainer/Image";
import { Inputs } from "./InputsContainer/Inputs";
import Joke from "./JokeContainer/Joke";
import Save from "./SaveContainer/Save";

function Main() {
  const [chuckImage, setChuckImage] = useState(true);

  return (
    <>
      <Image imageLink={chuckImage ? "Chuck Norris.JPG" : "Impersonator.JPG"} />
      <Joke />
      <Inputs setChuckImage={setChuckImage} />
      <Save />
    </>
  );
}
export default Main;
