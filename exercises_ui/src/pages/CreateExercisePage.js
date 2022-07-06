import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status === 201){
            alert("Successfully added the exercise");
        } else {
            alert("Failed to add the exercise");
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add an Exercise</h1>
            <p>Enter the details for the exercise you would like to track below.</p>
            <br></br>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter the number of reps"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter the weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                placeholder="Enter the unit"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="Enter the date"
                value={date}
                onChange={e => setDate(e.target.value)} />
                <br></br>
            <button
                onClick={createExercise}
            >Add</button>
            <div className='restrictionsDiv'>
                <p>Please be aware there are the following restrictions:</p>
                    <li>Must include all variables </li>
                    <li>Name must contain atleast 1 string (ie. "a") </li>
                    <li>Reps must be &gt; 0 (ie. "1+") </li>
                    <li>Weight must be &gt; 0 (ie. "1+") </li>
                    <li>Unit must be in either "kgs" or "lbs" </li>
                    <li>Date must following the format MM-DD-YY (ie. "01-01-21") </li>
                    <Link to="/">Back to HomePage</Link>
            </div>
        </div>
        
    );
}

export default CreateExercisePage;