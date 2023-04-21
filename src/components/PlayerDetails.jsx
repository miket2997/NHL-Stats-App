import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import { useParams, useNavigate } from "react-router-dom";
import PlayerInfo from "./PlayerInfo";
import PlayerStats from "./PlayerStats";
import GoalieStats from "./GoalieStats";

export default function PlayerDetails(){
    const {color} = useContext(ThemeContext);
    let {playerId} = useParams();
    const [players, setPlayers] = useState([]);
    const [stats, setStats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`)
        .then(res => {
            setPlayers(res.data.people);
        })
        .catch(err => console.log(err));
    }, [playerId]);

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=20222023`)
        .then(res => {
            setStats(res.data.stats);
        })
        .catch(err => console.log(err));
    }, [playerId]);


        return(
            <div className={`${color} details`}>
            {players.map(player => <PlayerInfo {...player} key={ player.id } />)}
            {stats.map((stat, index) => (
                <div key={ index }>
                {stat.splits.length ? (
                    stat.splits.map((split, index) => 
                        split.stat.goalAgainstAverage ? (
                            <GoalieStats key={ index } { ...split } /> 
                        ) : (
                            <PlayerStats key={ index } { ...split } />
                        )
                    )
                ) : (
                    <h2 className="no--stats" key={ index }>Player has not appeared in any games this season and has no stats to show.</h2>
                )}
                </div>
            ))}
            <div className="navigate--buttons">
                <button onClick={() => navigate("/")}>Go to Home Page</button>
                <button onClick={() => navigate(-1)}>Go back to roster</button>
            </div>
            </div>
        )
    }      
