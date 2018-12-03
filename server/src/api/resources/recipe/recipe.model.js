import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    description: {
        type: String,
        required: true
    },

    difficultyLevel: {
        type: Number,
        default: 0,
        max: 10,
        min: 0
    },

    image: {
        type: String
    },

    steps: [{
        type: String
    }],

    averageTimeForCompletion: {
        type: Number,
        min: 0
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

export const Recipe = mongoose.model('Recipe', recipeSchema);