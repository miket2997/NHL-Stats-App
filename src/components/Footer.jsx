import React from "react";
import { ThemeContext } from "../ThemeContext";

export default function Footer(){
    const {color} = React.useContext(ThemeContext);
    return (
        <footer className={`${color} footer`}>
            <p className="footer--p">NHL Stats App</p>
            <p>All statistics displayed are from the current regular season (2022-2023)</p>
        </footer>
    )
}
