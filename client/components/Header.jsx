import * as React from "react";
import { useCookies } from "react-cookie";

export default function Header() {
  const [cookies, setCookie] = useCookies();

  return (
    <>
      <div className="header-container">
        <div>
          <h1>
            <a href="">The Book Exchange</a>
          </h1>
        </div>
        <div className="user-name">
          <p>{cookies.name}</p>
          <img src={cookies.img} alt="user pic" />
        </div>
      </div>
      <hr className="bottom-hr" />
    </>
  );
}
