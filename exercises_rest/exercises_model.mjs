import mongoose from 'mongoose';
import 'dotenv/config';

// Reads .env file for mongoDB connection string
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to the mongoDB database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the exercise schema with required properties
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the exercise model from the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

// create an exercise
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

// find an exercise based on filters 
const findExercise = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

// find an exercise based on filters 
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

// update an exercise based on _id
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id}, { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount;
}

// delete an exercise based on a parameter entered
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteMany({_id: _id});
    return result.deletedCount;
}

export { createExercise, findExercise, updateExercise, deleteExercise, findExerciseById };