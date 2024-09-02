import './pullview.css';
import 'regenerator-runtime/runtime';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSeasons, getPulls, getThisDay } from '../../Utils/requests';
import { useState,  } from 'react';


export default function PullView() {
    const id = useParams({});
    const[pull, setPull] = useState([])
    const[groupmembers, setGroupMembers] = useState([])
    const[classSplit, setClassSplit] = useState([])
    const[pullClass, setPullClass] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getThisDay(id.id);
            console.log(id.id)

            setPull(response.data);

            var tempgm = []
            for (var i =0; i<response.data.students.length;i++) {
                tempgm.push((response.data.students[i].Name))
                
            }

            console.log(response.data)
            const numgroups = Math.ceil(response.data.students.length / 10)
            var groupsplits = []
            const sort_students = response.data.students.sort((a,b) => a.Class - b.Class)
            console.log(sort_students)
            var fourcount = 0;
            var threecount = 0;
            var twocount = 0;
            var onecount = 0;
            for (var j = 0; j<numgroups;j++){
                groupsplits.push([])
            }
            for (var i =0; i < response.data.students.length; i++) {

                switch (response.data.students[i].Class) {
                    case 4:
                        fourcount += 1
                        break;
                    case 3:
                        threecount += 1
                        break;
                    case 2:
                        twocount += 1
                        break;
                    case 1:
                        onecount += 1
                        break;
                }

                groupsplits[i%numgroups].push(response.data.students[i])

                
            }
            console.log(groupsplits)
            if (fourcount > (response.data.students.length / 2)) setPullClass('Senior')
            else if ((fourcount + threecount) > (response.data.students.length / 2)) setPullClass('Junior')
            else if ((fourcount + threecount + twocount) > (response.data.students.length / 2)) setPullClass('Sophomore')
            else setPullClass('Freshman')

            console.log(pullClass)
            //console.log(tempgm)
            setGroupMembers(tempgm)
            //console.log(pull)

        }


        const splitClass = async () => {
            
        }

        fetchData();
        splitClass();
    }, []);

    const goToPull = (idnum) => {
        if (localStorage.verify == 'false') navigate(`/verify/${idnum}`)

        else navigate(`/pull/${idnum}`);
    }


    return (
    <header className='App-header'>
        <h69>
          <button onClick={() => navigate('/')}>go home</button>
        </h69> 
        <div className='box'>
            <h2>
                 {pull.Group} Splits & Assignments
            </h2>
            <h2>
                You will be pulling as a {pullClass}!
            </h2>
        <div class="container">
            <div class="column">
            <h2>Column 1</h2>
                <list>
                    {groupmembers.map((groupmember, index) => (
                        <li key={index}>{groupmember}</li>
                    ))}
                </list>
            </div>
            <div class="column">
            <h2>Column 2</h2>
            <p>Content for the second column goes here.</p>
            </div>
        </div>        
        </div>

    </header>
    );
};

