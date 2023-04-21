import React from "react";

export default function PlayerStats(props){
    return (
        <table className="player--stat--table">
            <thead>
                <tr>
                    <th colSpan="2">Player Statistics for Current Season(2022-2023)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Games</td>
                    <td>{props.stat.games}</td>
                </tr>
                <tr>
                    <td>Goals</td>
                    <td>{props.stat.goals}</td>
                </tr>
                <tr>
                    <td>Assists</td>
                    <td>{props.stat.assists}</td>
                </tr>
                <tr>
                    <td>Points</td>
                    <td>{props.stat.points}</td>
                </tr>
                <tr>
                    <td>PowerPlay Goals</td>
                    <td>{props.stat.powerPlayGoals}</td>
                </tr>
                <tr>
                    <td>PowerPlay Points</td>
                    <td>{props.stat.powerPlayPoints}</td>
                </tr>
                <tr>
                    <td>Hits</td>
                    <td>{props.stat.hits}</td>
                </tr>
                <tr>
                    <td>Penalty Minutes</td>
                    <td>{props.stat.pim}</td>
                </tr>
                <tr>
                    <td>Time on Ice per Game</td>
                    <td>{props.stat.timeOnIcePerGame}</td>
                </tr>
                <tr>
                    <td>Faceoff Percentage</td>
                    <td>{props.stat.faceOffPct}%</td>
                </tr>
                <tr>
                    <td>+/-</td>
                    <td>{props.stat.plusMinus}</td>
                </tr>
                <tr>
                    <td>Blocked Shots</td>
                    <td>{props.stat.blocked}</td>
                </tr>
            </tbody>
        </table>
    )
}