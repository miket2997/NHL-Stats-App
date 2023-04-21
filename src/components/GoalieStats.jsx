import React from "react";

export default function GoalieStats(props){
    return (
        <table className="goalie--table">
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
                    <td>Wins</td>
                    <td>{props.stat.wins}</td>
                </tr>
                <tr>
                    <td>Losses</td>
                    <td>{props.stat.losses}</td>
                </tr>
                <tr>
                    <td>Shutouts</td>
                    <td>{props.stat.shutouts}</td>
                </tr>
                <tr>
                    <td>Saves</td>
                    <td>{props.stat.saves}</td>
                </tr>
                <tr>
                    <td>Save Percentage</td>
                    <td>{props.stat.savePercentage.toFixed(3)}</td>
                </tr>
                <tr>
                    <td>Goals Against</td>
                    <td>{props.stat.goalAgainstAverage.toFixed(3)}</td>
                </tr>
                <tr>
                    <td>PowerPlay Save Percentage</td>
                    <td>{props.stat.powerPlaySavePercentage.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    )
}