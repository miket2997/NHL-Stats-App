import React from "react";

export default function PlayerInfo(props){
    return (
        <table className="player--detail--table">
            <thead>
                <tr>
                    <th colSpan="2">Player Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Full Name</td>
                    <td>{props.fullName}</td>
                </tr>
                <tr>
                    <td>Primary Position</td>
                    <td>{ props.primaryPosition.name }</td>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{props.currentAge}</td>
                </tr>
                <tr>
                    <td>Birthday</td>
                    <td>{props.birthDate}</td>
                </tr>
                <tr>
                    <td>Place of Birth</td>
                    <td>{props.birthCity}, {props.birthStateProvince} {props.birthCountry}</td>
                </tr>
                <tr>
                    <td>Current Team</td>
                    <td>{props.currentTeam.name}</td>
                </tr>
                <tr>
                    <td>Primary Number</td>
                    <td>{props.primaryNumber}</td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>{props.height}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{props.weight}</td>
                </tr>
                <tr>
                    <td>Shoots/Catches</td>
                    <td>{props.shootsCatches}</td>
                </tr>
            </tbody>
        </table>
    )
   
}