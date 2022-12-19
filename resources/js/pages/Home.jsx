import React, { useEffect } from "react";
import axios from "../api/axios";

const Home = () => {
    useEffect(() => {
        // axios.get("/tournaments")
    }, []);
    return (
        <div className="max-w-7xl">
            <img
                src="https://media.makeameme.org/created/nothing-here.jpg"
                className="w-[5000px]"
            ></img>
        </div>
    );
};

export default Home;
