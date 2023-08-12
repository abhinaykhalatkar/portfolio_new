import "./BouncyText.scss";
import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";

export default function BouncyText({name_class="", text ,font_size=""}) {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`bounceContainer ${name_class} ${darkTheme ? "" : "light"}`}>
          {
            text!==""?
            text.split('').map((char, index) => (
              <span style={{ fontSize: font_size }} key={index} className="bouncyLetter">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))
            :null
          }
    </div>
  );
}
