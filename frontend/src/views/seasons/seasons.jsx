import './seasons.css';
import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeasons, getGames } from '../../Utils/requests';
import { useState,  } from 'react';

export default function Seasons() {
    const id = useParams({});
    const[games, setGames] = useState([])
    const[season, setSeason] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getSeasons();
            
            for (var i=0; i<response.data.length;i++){
                if (response.data[i].id != parseInt(id.id) ) response.data.splice(i, 1)
            }
            setGames(response.data[0].games)
            setSeason(response.data[0]);

        }
        fetchData();
    }, []);

    const goToSeason = (idnum) => {

        navigate(`/games/${idnum}`);
    }


    return (
    <header className='App-header'>
        <div className='box'>
            <h2>
                PLEASE PICK A GAME!
                <div className='button-container'>
                    {games.map((game, index) => (
                        <button className='custom-button' onClick={() => goToSeason(game.id)}>
                            {game.Game}
                        </button>
                    ))}
                </div>
            </h2>
        </div>
    </header>
    );
};

