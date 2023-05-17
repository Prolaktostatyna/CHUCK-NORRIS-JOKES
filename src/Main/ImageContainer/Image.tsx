import React, { FunctionComponent } from "react";

type ImageProps = {
  imageLink: string;
};

export const Image: FunctionComponent<ImageProps> = ({ imageLink }) => {
  return (
    <>
      <img src={require(`../../Images/${imageLink}`)} alt="HeaderImage" />
    </>
  );
};
