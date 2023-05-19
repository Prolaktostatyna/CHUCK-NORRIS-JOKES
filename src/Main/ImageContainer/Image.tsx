import React, { FunctionComponent } from "react";
import "../css/image.css";

type ImageProps = {
  imageLink: string;
};

export const Image: FunctionComponent<ImageProps> = ({ imageLink }) => {
  return (
    <>
      <img
        className="image"
        src={require(`../../Images/${imageLink}`)}
        alt="HeaderImage"
      />
    </>
  );
};
