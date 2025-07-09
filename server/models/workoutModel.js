const mongoose = require('mongoose');

const workoutProgramSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: String,
    exercises: [
        { 
            name: String, 
            sets: String, 
            reps: String 
        }
    ],
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutProgramSchema);
module.exports = Workout;