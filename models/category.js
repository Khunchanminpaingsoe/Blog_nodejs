const mongoose = require('mongoose');

const categrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const cat = mongoose.model('categories', categrySchema);
module.exports = cat;