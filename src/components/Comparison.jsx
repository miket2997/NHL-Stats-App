import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import Comparison2 from "./Comparison2";
import { useNavigate } from "react-router-dom";

export default function Comparison(){
    const {color} = useContext(ThemeContext);
    const [selectedTeamForComparison1, setSelectedTeamForComparison1] = useState("");
    const [teamsForComparison1, setTeamsForComparison1] = useState([]);
    const [playersForComparison1, setPlayersForComparison1] = useState([]);
    const [playerOneStats, setPlayer1Stats] = useState({});
    const [playerTwoStats, setPlayerTwoStats] = useState({});
    const [showStats, setShowStats] = useState(false);
    const [playerOneId, setPlayerOneId] = useState("");
    const [playerTwoId, setPlayerTwoId] = useState("");
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");
    const [playerOnePosition, setPlayerOnePosition] = useState("");
    const [playerTwoPosition, setPlayerTwoPosition] = useState("");
    const navigate = useNavigate();

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
        setPlayersForComparison1("")
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
            console.log(playerOneName)
            setPlayerOnePosition(res.data.people[0].primaryPosition.name)
            //console.log(res.data)
            //console.log(res.data.people[0].primaryPosition.name)
        })
        .catch(err => console.log(err));



        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerOneId}/stats?stats=statsSingleSeason&season=20222023`)
        .then(res => {
            setPlayer1Stats(res.data.stats[0].splits[0]);
            //console.log(res.data)
        })
        .catch(err => console.log(err));

        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerTwoId}`)
        .then(res => {
            setPlayerTwoName(res.data.people[0].fullName);
            console.log(playerTwoName)
            setPlayerTwoPosition(res.data.people[0].primaryPosition.name);
            console.log(playerTwoPosition)
            //console.log(res.data.people[0].primaryPosition.name)
        })
        .catch(err => console.log(err));

        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerTwoId}/stats?stats=statsSingleSeason&season=20222023`)
        .then(res => {
            setPlayerTwoStats(res.data.stats[0].splits[0]);
            setShowStats(true);
            //console.log(res.data)
        })
        .catch(err => console.log(err));
        //console.log("submitted")
        
    }

    return (
        <div className={`${color} comparison`}>
            <h1 className="comparison--h1">Player Comparison</h1>
            <small>Note: Goalies can only be compared to other goalies.</small>
            <label className="comparison--label--team">
                <h1 className="player--one--title">Player One</h1>
                Choose a Team to Select Player From
                <select className="team--comparison" value={selectedTeamForComparison1} onChange={handleTeamChangeForComparison1}>
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
            <Comparison2 handleChange={handlePlayerTwoChange}/>
            <button className="compare--submit" onClick={handleCompareSubmit}>Compare</button>
            {showStats && playerOnePosition != "Goalie" && playerTwoPosition != "Goalie" && playerOneStats && playerTwoStats && ( 
            <div className="comparison--display--one">
                <table className="comparison--table--one">
                    <thead>
                        <tr>
                            <th colSpan="2">{playerOneName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Games</th>
                            <th>{playerOneStats.stat.games}</th>
                        </tr>
                        <tr>
                            <th>Goals</th>
                            <th>{playerOneStats.stat.goals}</th>
                        </tr>
                        <tr>
                            <th>Assists</th>
                            <th>{playerOneStats.stat.assists}</th>
                        </tr>
                        <tr>
                            <th>Points</th>
                            <th>{playerOneStats.stat.points}</th>
                        </tr>
                        <tr>
                            <th>Blocked Shots</th>
                            <th>{playerOneStats.stat.blocked}</th>
                        </tr>
                        <tr>
                            <th>+/-</th>
                            <th>{playerOneStats.stat.plusMinus}</th>
                        </tr>
                    </tbody>
            </table>
            <table className="comparison--table--two">
                <thead>
                    <tr>
                        <th colSpan="2">{playerTwoName}</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <th>Games</th>
                            <th>{playerTwoStats.stat.games}</th>
                        </tr>
                        <tr>
                            <th>Goals</th>
                            <th>{playerTwoStats.stat.goals}</th>
                        </tr>
                        <tr>
                            <th>Assists</th>
                            <th>{playerTwoStats.stat.assists}</th>
                        </tr>
                        <tr>
                            <th>Points</th>
                            <th>{playerTwoStats.stat.points}</th>
                        </tr>
                        <tr>
                            <th>Blocked Shots</th>
                            <th>{playerTwoStats.stat.blocked}</th>
                        </tr>
                        <tr>
                            <th>+/-</th>
                            <th>{playerTwoStats.stat.plusMinus}</th>
                        </tr>
                    </tbody>
            </table>
            </div>
            )}
            {showStats && playerOnePosition === "Goalie" && playerTwoPosition === "Goalie" && (
                <div className="goalie--comparison">
                    <table className="goalie--table--one">
                        <thead>
                            <tr>
                                <th colSpan="2">{playerOneName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Games</td>
                                <td>{playerOneStats.stat.games}</td>
                            </tr>
                            <tr>
                                <td>Wins</td>
                                <td>{playerOneStats.stat.wins}</td>
                            </tr>
                            <tr>
                                <td>Losses</td>
                                <td>{playerOneStats.stat.losses}</td>
                            </tr>
                            <tr>
                                <td>Shutouts</td>
                                <td>{playerOneStats.stat.shutouts}</td>
                            </tr>
                            <tr>
                                <td>Saves</td>
                                <td>{playerOneStats.stat.saves}</td>
                            </tr>
                            <tr>
                                <td>Save Percentage</td>
                                <td>{playerOneStats.stat.savePercentage}</td>
                            </tr>
                            <tr>
                                <td>Goals Against</td>
                                <td>{playerOneStats.stat.goalAgainstAverage}</td>
                            </tr>
                            <tr>
                                <td>PowerPlay Save Percentage</td>
                                <td>{playerOneStats.stat.powerPlaySavePercentage}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="goalie--table--two">
                        <thead>
                        <tr>
                            <th colSpan="2">{playerTwoName}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Games</td>
                                <td>{playerTwoStats.stat.games}</td>
                            </tr>
                            <tr>
                                <td>Wins</td>
                                <td>{playerTwoStats.stat.wins}</td>
                            </tr>
                            <tr>
                                <td>Losses</td>
                                <td>{playerTwoStats.stat.losses}</td>
                            </tr>
                            <tr>
                                <td>Shutouts</td>
                             <td>{playerTwoStats.stat.shutouts}</td>
                            </tr>
                            <tr>
                                <td>Saves</td>
                                <td>{playerTwoStats.stat.saves}</td>
                            </tr>
                            <tr>
                                <td>Save Percentage</td>
                                <td>{playerTwoStats.stat.savePercentage}</td>
                            </tr>
                            <tr>
                                <td>Goals Against</td>
                                <td>{playerTwoStats.stat.goalAgainstAverage}</td>
                            </tr>
                            <tr>
                                <td>PowerPlay Save Percentage</td>
                                <td>{playerTwoStats.stat.powerPlaySavePercentage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {!playerOneStats && playerTwoStats && (
                <div className="no--player--one--stats">
                    <h3>{playerOneName} has no stats to show</h3>
                    <table className="player--one--nostats--table">
                        <thead>
                            <tr>
                                <th colSpan="2">{playerTwoName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Games</th>
                                <th>{playerTwoStats.stat.games}</th>
                            </tr>
                            <tr>
                                <th>Goals</th>
                                <th>{playerTwoStats.stat.goals}</th>
                            </tr>
                            <tr>
                                <th>Assists</th>
                                <th>{playerTwoStats.stat.assists}</th>
                            </tr>
                            <tr>
                                <th>Points</th>
                                <th>{playerTwoStats.stat.points}</th>
                            </tr>
                            <tr>
                                <th>Blocked Shots</th>
                                <th>{playerTwoStats.stat.blocked}</th>
                            </tr>
                            <tr>
                                <th>+/-</th>
                                <th>{playerTwoStats.stat.plusMinus}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {!playerTwoStats && playerOneStats && (
                <div className="no--playertwo--stats">
                    <table className="no--player2--table">
                        <thead>
                            <tr>
                                <th colSpan="2">{playerOneName}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Games</th>
                                <th>{playerOneStats.stat.games}</th>
                            </tr>
                            <tr>
                                <th>Goals</th>
                                <th>{playerOneStats.stat.goals}</th>
                            </tr>
                            <tr>
                                <th>Assists</th>
                                <th>{playerOneStats.stat.assists}</th>
                            </tr>
                            <tr>
                                <th>Points</th>
                                <th>{playerOneStats.stat.points}</th>
                            </tr>
                            <tr>
                                <th>Blocked Shots</th>
                                <th>{playerOneStats.stat.blocked}</th>
                            </tr>
                            <tr>
                                <th>+/-</th>
                                <th>{playerOneStats.stat.plusMinus}</th>
                            </tr>
                        </tbody>
                    </table>
                    <h3 className="two--no--show">{playerTwoName} has no stats to show.</h3>
                </div>
            )}
            {!playerOneStats && !playerTwoStats && (
             <h1 className="neither--stats">Neither player has any stats to show.</h1>
            )}
            <button className="comparison--to--home" onClick={() => navigate("/")}>Go to Home Page</button>
        </div>
    )
}