import React from "react";

export default function PlayerCompOne(props){
    return (
        <table className="comparison--table--one">
            <thead>
                <tr>
                    <th colSpan="2">{props.playerOneName}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Games</th>
                    <th>{props.stat.games}</th>
                </tr>
                <tr>
                    <th>Goals</th>
                    <th>{props.stat.goals}</th>
                </tr>
                <tr>
                    <th>Assists</th>
                    <th>{props.stat.assists}</th>
                </tr>
                <tr>
                    <th>Points</th>
                    <th>{props.stat.points}</th>
                </tr>
                <tr>
                    <th>Blocked Shots</th>
                    <th>{props.stat.blocked}</th>
                </tr>
                <tr>
                    <th>+/-</th>
                    <th>{props.stat.plusMinus}</th>
                </tr>
            </tbody>
        </table>
    )
}