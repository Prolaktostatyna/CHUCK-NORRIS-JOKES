import React, { FunctionComponent } from "react";
import "../css/image.css"

type ImageProps = {
  imageLink: string;
};

export const Image: FunctionComponent<ImageProps> = ({ imageLink }) => {
  return (
    <>
    <div className={`image ${imageLink}`}></div>
    
      {/* <img src={require(`../../Images/`)} alt="HeaderImage" /> */}
    </>
  );
};
