import './games.css';
import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeasons, getGames } from '../../Utils/requests';
import { useState,  } from 'react';

export default function Games() {
    const id = useParams({});
    const[games, setGames] = useState([])
    const[pulls, setPulls] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getGames();
            
            for (var i=0; i<response.data.length;i++){
                if (response.data[i].id != parseInt(id.id) ) response.data.splice(i, 1)
            }
            setGames(response.data[0]);
            console.log(response.data[0].pulls)
            setPulls(response.data[0].pulls)
        }
        fetchData();
    }, []);

    const goToPull = (idnum) => {
        navigate(`/verify/${idnum}`);
    }

    const goToCreate = (idnum) => {
        console.log(idnum)
        navigate(`/pull/create/${idnum}`);
    }


    return (
    <header className='App-header'>
        <div className='box'>
            <h2>
                PLEASE PICK OR CREATE A PULL GROUP!
                <div className='button-container'>
                    <button className='custom-button' onClick={()=>goToCreate(games.id)}>CREATE GROUP</button>
                    {pulls.map((pull, index) =>(
                        <button className='custom-button' onClick={() => goToPull(pull.id)}>
                            {pull.Group}
                        </button>
                        ))}
                </div>
            </h2>
        </div>
    </header>
    );
};

