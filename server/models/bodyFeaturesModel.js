const mongoose = require('mongoose');

const bodyFeaturesSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    weight: Number,
    height: Number,
    chest: Number,
    waist: Number,
    hips: Number,
    shoulders: Number,
    arms: Number,
    legs: Number,
    fatPercentage: Number,
}, { timestamps: true });

const BodyFeatures = mongoose.model('BodyFeatures', bodyFeaturesSchema);
module.exports = BodyFeatures;