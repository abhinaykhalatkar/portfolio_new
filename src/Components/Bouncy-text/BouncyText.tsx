import "./BouncyText.scss";
import React from "react";
import { useThemeContext } from "../../Context/ThemeContext/ThemeContext";

type BouncyTextProps = {
  name_class?: string;
  text: string;
  font_size?: string;
};

export default function BouncyText({
  name_class = "",
  text,
  font_size = "",
}: BouncyTextProps) {
  const { darkTheme } = useThemeContext();

  return (
    <div
      className={`bounceContainer ${name_class} ${darkTheme ? "" : "light"}`}
    >
      {text !== ""
        ? text.split("").map((char, index) => (
            <span
              style={{ fontSize: font_size }}
              key={index}
              className="bouncyLetter"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))
        : null}
    </div>
  );
}
