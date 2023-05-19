import React, { useState, useEffect, FunctionComponent, useRef } from "react";
import { Image } from "./ImageContainer/Image";
import { Inputs } from "./InputsContainer/Inputs";
import { Joke } from "./JokeContainer/Joke";
import "./css/main.css";

export const Main: FunctionComponent = () => {
  const [chuckImage, setChuckImage] = useState<boolean>(true);
  const [joke, setJoke] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const dataFetchedRef = useRef<boolean>(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const fetchData = async () => {
      try {
        const [resRandom, resCategory] = await Promise.all([
          fetch("https://api.chucknorris.io/jokes/random").then((res) =>
            res.json()
          ),
          fetch("https://api.chucknorris.io/jokes/categories").then((res) =>
            res.json()
          ),
        ]);
        // console.log(resRandom.value);
        // console.log(resCategory);
        setJoke(resRandom.value);
        setCategories(resCategory);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main">
      <Image imageLink={chuckImage ? "Chuck Norris.JPG" : "Impersonator.JPG"} />
      <Joke joke={joke} />
      <Inputs
        setChuckImage={setChuckImage}
        categories={categories}
        setJoke={setJoke}
      />
    </div>
  );
};
