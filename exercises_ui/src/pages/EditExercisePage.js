import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {
    // Set state variables for each exercise property
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    // Call PUT route in REST Api and fetches property values for specified exercise._id
    const editExercise = async () => {
        const editExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status === 200){
            alert("Successfully edited the exercise");
        } else {
            alert("Failed to edit the exercise");
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Edit the Exercise</h1>
            <p>Replace the details you would like below.</p>
            <br></br>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
                <br></br>
            <button
                onClick={editExercise}
            >Save</button>
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

export default EditExercisePage;