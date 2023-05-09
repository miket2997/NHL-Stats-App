import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import Comparison2 from "./Comparison2";
import PlayerCompOne from "./PlayerCompOne";
import PlayerCompTwo from "./PlayerCompTwo";
import GoalieCompOne from "./GoalieCompOne";
import GoalieCompTwo from "./GoalieCompTwo";


export default function Comparison(){
    // Theme Context
    const {color} = useContext(ThemeContext);
    // Team for first player
    const [selectedTeamForComparison1, setSelectedTeamForComparison1] = useState("");
    // Array of teams to select from for first option
    const [teamsForComparison1, setTeamsForComparison1] = useState([]);
    // Array of players for first selected team
    const [playersForComparison1, setPlayersForComparison1] = useState([]);
    // Stats of the first selected player
    const [playerOneStats, setPlayer1Stats] = useState([]);
    // Stats of the second selected player
    const [playerTwoStats, setPlayerTwoStats] = useState([]);
    // State for whether stats are shown
    const [showStats, setShowStats] = useState(false);
    // 
    const [playerOneId, setPlayerOneId] = useState("");
    const [playerTwoId, setPlayerTwoId] = useState("");
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");
    const [playerOnePosition, setPlayerOnePosition] = useState("");
    const [playerTwoPosition, setPlayerTwoPosition] = useState("");

    useEffect(() => {
        axios.get("https://statsapi.web.nhl.com/api/v1/teams")
        .then(res => {
            setTeamsForComparison1(res.data.teams)
        })
        .catch(err => console.log(err))
    }, []);



    useEffect(() => {
        if(!selectedTeamForComparison1){
            return;
        }
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${selectedTeamForComparison1}/roster`)
        .then(res => {
            setPlayersForComparison1(res.data.roster)
        })
        .catch(err => console.log(err));
    }, [selectedTeamForComparison1])

    function handleTeamChangeForComparison1(event){
        setSelectedTeamForComparison1(event.target.value)
    }

    function reset(){
        setSelectedTeamForComparison1("");
        setPlayersForComparison1("");
    }

    function removeStats(){
        setShowStats(false)
    }

    function handlePlayerOneChange(event){
        setPlayerOneId(event.target.value)
        //console.log("player one changing")
    }

    function handlePlayerTwoChange(event){
        setPlayerTwoId(event.target.value);
        //console.log("player two changing")
    }

    function handleCompareSubmit(){

        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerOneId}`)
        .then(res => {
            setPlayerOneName(res.data.people[0].fullName);
            setPlayerOnePosition(res.data.people[0].primaryPosition.name)
            //console.log(res.data)
            //console.log(res.data.people[0].primaryPosition.name)
        })
        .catch(err => console.log(err));



        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerOneId}/stats?stats=statsSingleSeason&season=20222023`)
        .then(res => {
            setPlayer1Stats(res.data.stats);
            //console.log(res.data)
        })
        .catch(err => console.log(err));

        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerTwoId}`)
        .then(res => {
            setPlayerTwoName(res.data.people[0].fullName);
            setPlayerTwoPosition(res.data.people[0].primaryPosition.name);
            // console.log(playerTwoPosition)
            //console.log(res.data.people[0].primaryPosition.name)
        })
        .catch(err => console.log(err));

        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerTwoId}/stats?stats=statsSingleSeason&season=20222023`)
        .then(res => {
            setPlayerTwoStats(res.data.stats);
            setShowStats(true);
            //console.log(res.data)
        })
        .catch(err => console.log(err));
        //console.log("submitted")
        
    }

    return (
        <div className={`${color} comparison`}>
            <h1 className="comparison--h1">Player Comparison</h1>
            <small style={ { color: "red", fontWeight: "bolder" } }>Note: Goalies can only be compared to other goalies.</small>
            <label className="comparison--label--team">
                <h1 className="player--one--title">Player One</h1>
                Choose a Team to Select Player From
                <select className="team--comparison" value={ selectedTeamForComparison1 } onChange={ handleTeamChangeForComparison1 }>
                    <option value="">---</option>
                    {teamsForComparison1.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </label>
            {playersForComparison1.length > 0 && (
                <label className="comparison--label--player">
                    Choose a Player
                    <select className="player--select--comparison" value={playerOneId} onChange={handlePlayerOneChange}>
                        <option value="">---</option>
                        {playersForComparison1.map(player => (
                            <option key={player.person.id} value={player.person.id}>
                                {player.person.fullName}
                            </option>
                        ))}
                    </select>
                    <button className="comparison--reset" onClick={reset}>Reset</button>
                </label>
            )}
            <Comparison2 handleChange={handlePlayerTwoChange} />
            <button className="compare--submit" onClick={handleCompareSubmit}>Compare</button>

            {playerOnePosition !== "Goalie" && playerTwoPosition !== "Goalie" && playerOneStats.length > 0 && playerTwoStats.length > 0 && showStats && ( 
            <div className="comparison--display--one">
                { playerOneStats.map((stat, index) => (
                    <div key={ index }>
                        { stat.splits.length > 0 ? (
                            stat.splits.map((split, index) => (
                                <PlayerCompOne key={ index } {...split} playerOneName={ playerOneName } />
                            ))
                        ) : (
                            <h3 className="no--player--one--stats">{playerOneName} has no stats to show</h3>
                        )}
                        
                    </div>
                ))}
                { playerTwoStats.map((stat, index) => (
                    <div key={ index }>
                        { stat.splits.length > 0 ? (
                            stat.splits.map((split, index) => (
                                <PlayerCompTwo key={index} {...split} playerTwoName={playerTwoName} />
                            ))
                        ) : (
                            <h3 className="no--player--two--stats">{playerTwoName} has no stats to show</h3>
                        )}
                        
                    </div>
                ))}
            </div>
            )}
            { playerOnePosition === "Goalie" && playerTwoPosition === "Goalie" && playerOneStats.length > 0 && playerTwoStats.length > 0 && showStats && (
                <div className="goalie--comparison">
                    { playerOneStats.map((stat, index) => (
                        <div key={index}>
                            { stat.splits.length > 0 ? (
                                stat.splits.map((split, index) => (
                                    <GoalieCompOne key={index} {...split} playerOneName={playerOneName} />
                                ))
                            ) : (
                                <h3 className="no--player--one--stats">{ playerOneName } has no stats to show</h3>
                            )}
                        </div>
                    ))}

                    { playerTwoStats.map((stat, index) => (
                        <div key={index}>
                            { stat.splits.length > 0 ? (
                                stat.splits.map((split, index) => (
                                    <GoalieCompTwo key={index} {...split} playerTwoName={playerTwoName} />
                                ))
                            ) : (
                                <h3 className="no--player--two--stats">{ playerTwoName } has no stats to show</h3>
                            )}
                        </div>
                    ))}
                </div>
            )}
            { showStats && <button className="reset--stats" onClick={ removeStats }>Clear stats</button> }
        </div>
    )
}

