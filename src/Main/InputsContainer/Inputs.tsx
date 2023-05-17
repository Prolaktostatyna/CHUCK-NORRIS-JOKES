import React from "react";

function Inputs() {
  //params: string
  return (
    <>
      <select>
        <option value="" disabled selected>
          Categories
        </option>
      </select>
      <input type="text" placeholder="Impersonate Chuck Norris"></input>
      <button>Draw a random Chuck Norris Joke</button>
    </>
  );
}
export default Inputs;
