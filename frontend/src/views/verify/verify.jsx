import './verify.css';
import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeasons, getGames, getPulls, checkPullCode } from '../../Utils/requests';
import { useState,  } from 'react';

export default function Verify() {
    const id = useParams({});
    const[pulls, setPull] = useState([])
    const navigate = useNavigate();
    const[code, setCode]=useState('')
    const[invalid, setInvalid] = useState(false)
    useEffect(() => {

        const fetchData = async () => {


            const response = await getPulls();
            
            for (var i=0; i<response.data.length;i++){
                if (response.data[i].id != parseInt(id.id) ) response.data.splice(i, 1)
            }
            setPull(response.data[0]);

        }
        fetchData();
    }, []);

    const sendCode = (mycode) => {
        console.log(pulls)
        checkPullCode(pulls.id, mycode).then((response) => {
            if (response.data == true) navigate(`/pull/${pulls.id}`)
            else setInvalid(true)}).catch((error) => {
                setInvalid(true)
            })
        //navigate(`/pull/${pulls[0].id}`)
    }

    const handleTyping = (event) => {
        setCode(event.target.value)
    }
    return (
    <header className='App-header'>
        <div className='box'>
            <h2>
                Enter the join code for {pulls.Group}:
                <div className='button-container'>
                    <input type="text" id="textbox" name="textbox" placeholder="Pull code" onChange={handleTyping}></input>
                    <div className='badderp'> {invalid ? (
                        <p className='badp'>Wrong join code, please try again!</p>
                    ) : (
                        <p></p>
                    )}</div>
                    <button className='custom-button' onClick={() => sendCode(code)}>
                        Submit
                    </button>
                </div>
            </h2>
        </div>
    </header>
    );
};

