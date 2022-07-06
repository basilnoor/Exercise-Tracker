import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const history = useHistory();
    // State variable allows us to make changes to DOM in real-time
    const [exercises, setExercises] = useState([]);

    // onDelete function passed down to Exercise component and recieves an exercise._id
    // calls DELETE route in REST Api with exercise._id
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            const newExercises = exercises.filter(exercise => exercise._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}.`)
        }
    };
    // onEdit function passed down to exercise component and recieves an exercise
    // onCLick pushes to editExercisePage while sharing the exerciseToEdit variable
    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        history.push("/edit-exercise");
    }

    // Makes a GET request to the REST Api to retrieve all exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    // useEffect function gets the response from loadExercise and displays all the results on the DOM due to empty []
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h1>Ultimate Exercise Tracker</h1>
            <div className='HomepageDiv'>
            <p>
                Below I have added a few amazing exercises that you can do <b>AT HOME</b>.
                <br></br>
                Feel free to <b>edit</b> or <b>delete</b> any of the exercises you don't like.
                <br></br>
                <br></br>
                Want to <b>add</b> your own exercise?
                <br></br>
                <Link to="/create-exercise">Click Here!</Link>
            </p>
            </div>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    );
}

export default HomePage;