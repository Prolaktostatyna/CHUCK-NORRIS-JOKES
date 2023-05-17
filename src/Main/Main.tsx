import React, { useState, useEffect } from "react";
import { Image } from "./ImageContainer/Image";
import { Inputs } from "./InputsContainer/Inputs";
import { Joke } from "./JokeContainer/Joke";
import Save from "./SaveContainer/Save";

function Main() {
  const [chuckImage, setChuckImage] = useState(true);
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://api.chucknorris.io/jokes/random", {
        method: "GET",
      });
      const jsonData = await data.json();

      setJoke(jsonData.value);
    };

    api();
  }, []);

  return (
    <>
      <Image imageLink={chuckImage ? "Chuck Norris.JPG" : "Impersonator.JPG"} />
      <Joke joke={joke} />
      <Inputs setChuckImage={setChuckImage} />
      <Save />
    </>
  );
}
export default Main;
