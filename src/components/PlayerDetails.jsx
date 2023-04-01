import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import { useParams, useNavigate } from "react-router-dom";

export default function PlayerDetails(){
    const {color} = React.useContext(ThemeContext);
    let {playerId} = useParams();
    const [player, setPlayer] = useState({});
    const [stats, setStats] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`)
        .then(res => {
            setPlayer(res.data);
            //console.log(res.data)
        })
        .catch(err => console.log(err));
    }, [playerId]);

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=20222023`)
        .then(res => {
            setStats(res.data.stats[0].splits);
        })
        .catch(err => console.log(err));
    }, [playerId]);


    return(
        <div className={`${color} details`}>
            {player.people && player.people.length > 0 && (
            <table className="player--detail--table">
                <thead>
                  <tr>
                    <th colSpan="2">Player Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>{player.people[0].fullName}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{player.people[0].currentAge}</td>
                  </tr>
                  <tr>
                    <td>Birthday</td>
                    <td>{player.people[0].birthDate}</td>
                  </tr>
                  <tr>
                    <td>Place of Birth</td>
                    <td>{player.people[0].birthCity}, {player.people[0].birthStateProvince} {player.people[0].birthCountry}</td>
                  </tr>
                  <tr>
                    <td>Current Team</td>
                    <td>{player.people[0].currentTeam.name}</td>
                  </tr>
                  <tr>
                    <td>Primary Number</td>
                    <td>{player.people[0].primaryNumber}</td>
                  </tr>
                  <tr>
                    <td>Height</td>
                    <td>{player.people[0].height}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{player.people[0].weight}</td>
                  </tr>
                  <tr>
                    <td>Shoots/Catches</td>
                    <td>{player.people[0].shootsCatches}</td>
                  </tr>
                </tbody>
            </table>
              
            )}
                <br />
                {stats.length === 0 && (
                    <h1 className="no--stats">No stats to show. Player has not appeared in any games this season.</h1>
                )}
                {stats.length > 0 && player.people[0].primaryPosition.name != "Goalie" && (
                <table className="player--stat--table">
                    <thead>
                        <tr>
                            <th colSpan="2">Player Statistics for Current Season(2022-2023)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Games</td>
                            <td>{stats[0].stat.games}</td>
                        </tr>
                        <tr>
                            <td>Goals</td>
                            <td>{stats[0].stat.goals}</td>
                        </tr>
                        <tr>
                            <td>Assists</td>
                            <td>{stats[0].stat.assists}</td>
                        </tr>
                        <tr>
                            <td>Points</td>
                            <td>{stats[0].stat.points}</td>
                        </tr>
                        <tr>
                            <td>PowerPlay Goals</td>
                            <td>{stats[0].stat.powerPlayGoals}</td>
                        </tr>
                        <tr>
                            <td>PowerPlay Points</td>
                            <td>{stats[0].stat.powerPlayPoints}</td>
                        </tr>
                        <tr>
                            <td>Hits</td>
                            <td>{stats[0].stat.hits}</td>
                        </tr>
                        <tr>
                            <td>Penalty Minutes</td>
                            <td>{stats[0].stat.pim}</td>
                        </tr>
                        <tr>
                            <td>Time on Ice per Game</td>
                            <td>{stats[0].stat.timeOnIcePerGame}</td>
                        </tr>
                        <tr>
                            <td>Faceoff Percentage</td>
                            <td>{stats[0].stat.faceOffPct}%</td>
                        </tr>
                        <tr>
                            <td>+/-</td>
                            <td>{stats[0].stat.plusMinus}</td>
                        </tr>
                        <tr>
                            <td>Blocked Shots</td>
                            <td>{stats[0].stat.blocked}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {stats.length > 0 && player.people[0].primaryPosition.name === "Goalie" && (
                <table className="goalie--table">
                    <thead>
                    <tr>
                        <th colSpan="2">Player Statistics for Current Season(2022-2023)</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Games</td>
                            <td>{stats[0].stat.games}</td>
                        </tr>
                        <tr>
                            <td>Wins</td>
                            <td>{stats[0].stat.wins}</td>
                        </tr>
                        <tr>
                            <td>Losses</td>
                            <td>{stats[0].stat.losses}</td>
                        </tr>
                        <tr>
                            <td>Shutouts</td>
                            <td>{stats[0].stat.shutouts}</td>
                        </tr>
                        <tr>
                            <td>Saves</td>
                            <td>{stats[0].stat.saves}</td>
                        </tr>
                        <tr>
                            <td>Save Percentage</td>
                            <td>{stats[0].stat.savePercentage.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td>Goals Against</td>
                            <td>{stats[0].stat.goalAgainstAverage.toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td>PowerPlay Save Percentage</td>
                            <td>{stats[0].stat.powerPlaySavePercentage.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            ) }
                <div className="navigate--buttons">
                    <button onClick={() => navigate("/")}>Go to Home Page</button>
                    <button onClick={() => navigate(-1)}>Go back to roster</button>
                </div>
        </div>
    )
}