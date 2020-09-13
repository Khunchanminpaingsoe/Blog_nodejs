const mongoose = require('mongoose');

const comScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})

const comment = mongoose.model('comments', comScheme);
module.exports = comment;