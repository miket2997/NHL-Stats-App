import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeamInfo, setSelectedTeamInfo] = useState({});
  const { color } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get("https://statsapi.web.nhl.com/api/v1/teams")
      .then(res => {
        //console.log(res);
        setTeams(res.data.teams)
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const selectedTeamFromStorage = sessionStorage.getItem('selectedTeam');
    if(selectedTeamFromStorage){
      setSelectedTeam(selectedTeamFromStorage)
    }
  }, [])

  useEffect(() => {
    if (!selectedTeam) {
      return;
    }
    sessionStorage.setItem('selectedTeam', selectedTeam);

    axios
      .get(`https://statsapi.web.nhl.com/api/v1/teams/${selectedTeam}`)
      .then(res => {
        //console.log(res);
        setSelectedTeamInfo(res.data);
      })
      .catch(error => console.log(error));
  }, [selectedTeam]);

  function handleTeamChange(event) {
    setSelectedTeam(event.target.value);
  }

  function resetTeam(){
    setSelectedTeam("");
  }

  return (
    <div className={`${color} home`}>
      <h1 className="main--title">NHL Stats App</h1>
      <label className="home--label">
        Select a Team:
        <select className="home--team--select" value={selectedTeam} onChange={handleTeamChange}>
          <option value="">---Choose a team---</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {selectedTeamInfo.teams && selectedTeam && (
        <div className="selected--team--info">
            <h2>{selectedTeamInfo.teams[0].name}</h2>
            <p>Location: {selectedTeamInfo.teams[0].locationName}</p>
            <p>Division: {selectedTeamInfo.teams[0].division.name}</p>
            <p>Conference: {selectedTeamInfo.teams[0].conference.name}</p>
            <a href={selectedTeamInfo.teams[0].officialSiteUrl}>Link to the official website of the {selectedTeamInfo.teams[0].name}.</a>
            <Link to={`/roster/${selectedTeam}`}>
              <button className="roster--button">Go to Roster</button>
            </Link>
            <button className="reset--btn" onClick={resetTeam}>Reset Team</button>
        </div>
        )}
      </label>
    </div>
  );

}
