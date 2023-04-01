import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function Roster(){
    const {color} = useContext(ThemeContext);
    const {teamId} = useParams();
    const [roster, setRoster] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`)
        .then(res => {
            setRoster(res.data.roster)
        })
        .catch(err => console.log(err));
    }, [teamId]);


    return (
        <div className={`${color} roster`}>
            <h2 className="roster--title">Roster</h2>
            <table className="roster--table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Link To Stats/Details</th>
                    </tr>
                </thead>
                <tbody>
                    {roster.map(player => (
                        <tr key={player.person.id}>
                            <td>{player.person.fullName} #{player.jerseyNumber}</td>
                            <td>{player.position.name}</td>
                            <td className="link">
                                <Link to={`/playerDetails/${player.person.id}`}>
                                    Go to player stats/details
                                </Link> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="roster--page--btn" onClick={() => navigate("/")}>Go back</button>
        </div>
    ) 
    
}