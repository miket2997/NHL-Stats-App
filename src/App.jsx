import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Roster from "./components/Roster";
import PlayerDetails from "./components/PlayerDetails";
import Comparison from "./components/Comparison";
import Footer from "./components/Footer";
import {ThemeContext} from "./ThemeContext";

function App() {
  const {color, toggleTheme} = React.useContext(ThemeContext);
  
  return(
      <Router className={`${color} container`}>
        <nav className={`${color} nav`}>
          <Link className={`${color} nav--links`} to = "/">Home</Link>
          <Link className={`${color} nav--links`} to = "comparison">Player Comparison</Link>
          <button className={`${color} toggleBtn`} onClick={toggleTheme}>
            {color === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          </button>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/roster/:teamId" element={<Roster />}/>
          <Route path="/playerDetails/:playerId" element={<PlayerDetails />}/>
          <Route path="/comparison" element={<Comparison />}/>
        </Routes>
        <Footer />
      </Router>
    )
  
}

export default App
