import './pull.css';
import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeasons, getGames, getPulls, checkPullCode, addStudent } from '../../Utils/requests';
import { useState,  } from 'react';

export default function Pull() {
    const id = useParams({});
    const[pulls, setPull] = useState([])
    const[classyr, setClassyr] = useState('');
    const[studentName, setStudentName] = useState('');
    const[available, setAvailable] = useState('')
    const navigate = useNavigate();
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

    const addToPull = (name, classyrs, availability,pull) => {
        addStudent(name, classyrs, availability, pull).then((response)=>{})
        navigate(`/pull-view/${pulls.id}`)
    }

    const handleChange = (event) => {
        //console.log(event.target.value)
        setClassyr(parseInt(event.target.value))
      };
    const handletyping = (event) => {
        setStudentName(event.target.value);
    }

    const handleRadio = (event) => {
        setAvailable(event.target.value)
    }



    return (
    <header className='App-header'>
        <div className='box'>
            <h2>
                Please enter your name, Class Year, and Availability
                <div className='button-container'>
                    <input type="text" id="textbox" name="textbox" placeholder="Name" onChange={handletyping}></input><br></br>
                    <label for="dropdown">Class (by Credit Hours):</label>
                    <div className='dropdown-menu'>
                        <select id="dropdown" name="options" onChange={handleChange}>
                        <option value="">Select class</option>
                        <option value="1">Freshman</option>
                        <option value="2">Sophomore</option>
                        <option value="3">Junior</option>
                        <option value="4">Senior</option>
                        </select>
                    </div>
                    <label for='checkbox'>Availability:</label>
                    <div className="checkbox-grid">
                        <label>
                        <input type="radio" name="option1" value="11" onChange={handleRadio} checked={available=="11"}/> Pull & Line
                        </label>
                        <label>
                        <input type="radio" name="option2" value="10" onChange={handleRadio} checked={available==="10"}/> Line Only
                        </label>
                        <label>
                        <input type="radio" name="option3" value="01" onChange={handleRadio} checked={available==="01"}/> Pull Only
                        </label>
                        <label>
                        <input type="radio" name="option4" value="00" onChange={handleRadio} checked={available==="00"}/> None
                        </label>
                    </div>

                    <button className='custom-button' onClick={() => addToPull(studentName, classyr, available, pulls)}>
                        Submit
                    </button>
                </div>
            </h2>
        </div>
    </header>
    );
};

