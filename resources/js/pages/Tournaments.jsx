import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import Card from "../components/card";
import CreateTournament from "../modals/CreateTournament";

const Tournaments = () => {
    const { id } = useParams();
    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [selectedTeam, setSelectedTeams] = useState([]);

    const fetchTournaments = async () => {
        if (id) {
            const result = await axios.get(`categories/${id}`);
            setTournaments(result.data.tournaments);
            setSelectedTeams(result.data.teams.map((team) => team.id));
        } else {
            const result = await axios.get("/tournaments");
            setTournaments(result.data);
        }
    };

    const fetchTeams = async () => {
        const result = await axios.get("/teams");
        setTeams(result.data);
    };
    const creation = (id = null) => {
        setSelectedTournament(
            id != null ? tournaments.find((x) => x.id == id) : {}
        );
    };
    const deletion = async (id) => {
        await axios.delete(`tournaments/${id}`);
        await fetchTournaments();
    };
    const saveTournament = async (tournament) => {
        if (selectedTournament && Object.keys(selectedTournament).length > 0) {
            await axios.put(`tournaments/${tournament.id}`, {
                ...tournament,
                categories: tournament.categories.map((x) => x.id),
                teams: selectedTeam,
            });
        } else {
            await axios.post(`tournaments`, {
                ...tournament,
                categories: [id],
                teams: selectedTeam,
            });
        }
        setSelectedTournament(null);
        await fetchTournaments();
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        fetchTournaments();
    }, [id]);
    return (
        <>
            <CreateTournament
                saveTournament={saveTournament}
                Teams={teams}
                SetSelectedTeams={setSelectedTeams}
                SelectedTeam={selectedTeam}
                Tournament={selectedTournament}
            ></CreateTournament>
            <div className="text-center my-10 text-2xl flex justify-center gap-5">
                {"Tournaments"}
                {id && (
                    <button
                        onClick={() => creation()}
                        className="inline-flex justify-center rounded-md bg-indigo-500 bg-opacity-4 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                        <PlusIcon
                            className="h-5 w-5 text-green-500 hover:text-green-300"
                            aria-hidden="true"
                        />
                    </button>
                )}
            </div>
            <div className="grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
                {tournaments.map((tournament) => (
                    <Card
                        id={tournament.id}
                        key={tournament.id}
                        title={tournament.name}
                        to={`/Teams/${tournament.id}`}
                        edit={() => creation(tournament.id)}
                        deletion={() => deletion(tournament.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default Tournaments;
