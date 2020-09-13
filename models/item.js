const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
});

const item = mongoose.model('items', itemSchema);
module.exports = item;