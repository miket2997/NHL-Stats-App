import React from "react";

export default function GoalieCompTwo(props){
    return (
        <table className="goalie--table--two">
                        <thead>
                        <tr>
                            <th colSpan="2">{props.playerTwoName}</th>
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
                                <td>{parseFloat(props.stat.savePercentage).toFixed(3)}</td>
                            </tr>
                            <tr>
                                <td>Goals Against</td>
                                <td>{parseFloat(props.stat.goalAgainstAverage).toFixed(3)}</td>
                            </tr>
                            <tr>
                                <td>PowerPlay Save Percentage</td>
                                <td>{parseFloat(props.stat.powerPlaySavePercentage).toFixed(3)}</td>
                            </tr>
                        </tbody>
                    </table>
    )
}