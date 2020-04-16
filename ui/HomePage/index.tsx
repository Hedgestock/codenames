import * as React from "react";
import Cookie from "cookie";

console.log("testetsS");

const Homepage = ()=> {

  return(
  <div>{Cookie.parse(document.cookie)}</div>
  );
}

export default Homepage;