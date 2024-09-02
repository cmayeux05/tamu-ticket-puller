import './join.css';
import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeasons } from '../../Utils/requests';
import { useState } from 'react';


export default function Join() {
    const[seasons, setSeasons] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getSeasons();
            console.log(response.data)
            setSeasons(response.data);
        }
        fetchData();
    }, []);

    const goToSeason = (year) => {

        navigate(`/seasons/${year}`);
    }


    return (
    <header className='App-header'>
        <div className='box'>
            <h2>
                PLEASE PICK A SEASON!
                <div className='button-container'>
                    {seasons.map((season, index) => (
                        <button className='custom-button' onClick={() => goToSeason(season.id)}>
                            {season.Season} 
                        </button>
                    ))}  
                </div>
            </h2>
        </div>
    </header>
    );
};

