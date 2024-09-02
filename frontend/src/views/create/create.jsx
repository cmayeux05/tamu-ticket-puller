import './create.css';
import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeasons, getGames, addGroup, checkPullCode } from '../../Utils/requests';
import { useState,  } from 'react';

export default function Create() {
    const id = useParams({});
    const[games, setGames] = useState([])
    const navigate = useNavigate();
    const[code, setCode]=useState('')
    const[name, setName] = useState('')
    const[newPull, setNewPull] = useState([])
    useEffect(() => {

        const fetchData = async () => {


            const response = await getGames();
            
            for (var i=0; i<response.data.length;i++){
                if (response.data[i].id != parseInt(id.id) ) response.data.splice(i, 1)
            }
            setGames(response.data[0]);

        }
        fetchData();
        //console.log(games)
    }, []);


    const handleTypingCode = (event) => {
        setCode(event.target.value)
    }

    const handleTypingName = (event) => {
        setName(event.target.value)
    }

    const sendNewGroup = async (groupname, groupcode, groupgame) => {
        const response = await addGroup(groupname,groupcode,groupgame)
        if (response) {
            navigate(`/pull-view/${response.data.id}`)

        }


    }

    return (
    <header className='App-header'>
        <div className='box'>
            <h2>
                Please enter the name of your group:
                <div className='button-container'>
                    <input type="text" id="textbox" name="textbox" placeholder="Group Name" onChange={handleTypingName}></input>
                    <input type="text" id="textbox" name="textbox" placeholder="Group Code (ex: 2027)" onChange={handleTypingCode}></input>
                    <button className='custom-button' onClick={() => sendNewGroup(name,code,games)}>
                        Create Group
                    </button>
                </div>
            </h2>
        </div>
    </header>
    );
};

