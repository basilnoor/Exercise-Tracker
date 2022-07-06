import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';


const PORT = process.env.PORT;

const app = express();

app.use(express.json());


/*
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}
/*
* Returns 0 if any of the properties are invalid.
* Calls isDateValid() function to validate the date.
*/
function isValid(name, reps, weight, unit, date) {
    if (name === null || name === '') {
        return 0
    }
    if (reps < 1) {
        return 0
    }
    if (weight < 1) {
        return 0
    }
    if (unit !== "kgs" && unit !== "lbs") {
        return 0
    }
    const dateResult = isDateValid(date)
    if (dateResult === false) {
        return 0
    }
}

/**
 * Create a new exercise with the name, reps, weight, unit and date properties provided in the body
 */
app.post('/exercises', (req, res) => {
    const result = isValid(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    if (result === 0) {
        res.status(400).send({ Error: "Invalid request" });
    } else {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
        res.status(201).json(exercise)
    })
    .catch(error => {
        console.error(error);
        res.status(400).send({ Error: "Invalid request" });
    })
}});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).send({ Error: "Invalid request" });
        })
});

/**
 * Retrieve exercises. 
 * If the query parameters include a certain property (ie. name), then all exercises matching that property are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
    // If I wanted to add filters to retrieve with specific parameters, would add them in 'filters'.
    // For now, this retrieves all exercises with no path parameter.
    let filter = {};
    exercises.findExercise(filter)
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).send({ Error: "Invalid request" });
        })
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its properties based on the values provided in the body.
 * Only changes properties for the parameters in the query (ie. name, reps).
 */
app.put('/exercises/:_id', (req, res) => {
    const result = isValid(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    if (result === 0) {
        res.status(400).send({ Error: "Invalid request" });
    } else {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: "Not found" })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).send({ Error: "Invalid request" });
        })
}});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not found" })
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: "Invalid request" });
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});