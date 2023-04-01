import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";


export default function Comparison2(props){
    const {color} = useContext(ThemeContext);
    const [selectedTeamForComparison2, setSelectedTeamForComparison2] = useState("");
    const [teamsForComparison2, setTeamsForComparison2] = useState([]);
    const [playersForComparison2, setPlayersForComparison2] = useState([]);


    useEffect(() => {
        axios.get("https://statsapi.web.nhl.com/api/v1/teams")
        .then(res => {
            setTeamsForComparison2(res.data.teams)
        })
        .catch(err => console.log(err))
    }, []);


    useEffect(() => {
        if(!selectedTeamForComparison2){
            return;
        }

        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${selectedTeamForComparison2}/roster`)
        .then(res => {
            setPlayersForComparison2(res.data.roster)
        })
        .catch(err => console.log(err));
    }, [selectedTeamForComparison2])

    function handleTeamChangeForComparison2(event){
        setSelectedTeamForComparison2(event.target.value)
    }

    function reset2(){
        setPlayersForComparison2("");
        setSelectedTeamForComparison2("")
    }

    

    return (
        <div className={`${color} comparison2`}>
            <label className="team--two--label">
                <h1 className="player--two--title">Player Two</h1>
                Choose a Team to Select Player From
                <select className="team--two--select" value={selectedTeamForComparison2} onChange={handleTeamChangeForComparison2}>
                    <option value="">---</option>
                    {teamsForComparison2.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </label>
            {playersForComparison2.length > 0 && (
                <label className="player--two--label">
                    Choose a Player
                    <select className="player--two--select" onChange={props.handleChange}>
                        <option value="">---</option>
                        {playersForComparison2.map(player => (
                            <option key={player.person.id} value={player.person.id}>
                                {player.person.fullName}
                            </option>
                        ))}
                    </select>
                    <button className="compare--reset--two" onClick={reset2}>Reset</button>
                </label>
            )}
        </div>
    )
}