import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import Card from "../components/card";

const Teams = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const fetchTeams = async () => {
        if (id) {
            const result = await axios.get(`/tournaments/${id}`);
            setTeams(result.data.teams);
            console.log(result.data.teams);
        } else {
            const result = await axios.get(`/teams`);
            setTeams(result.data);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [id]);
    return (
        <>
            <div className="text-center my-10 text-2xl flex justify-center gap-5">
                {"Teams"}
                <button className="inline-flex justify-center rounded-md bg-indigo-500 bg-opacity-4 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <PlusIcon
                        className="h-5 w-5 text-green-500 hover:text-green-300"
                        aria-hidden="true"
                    />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
                {teams.map((team) => (
                    <Card
                        id={team.id}
                        key={team.id}
                        title={team.name}
                        to={`/Tournaments/${team.id}`}
                    />
                ))}
            </div>
        </>
    );
};

export default Teams;
