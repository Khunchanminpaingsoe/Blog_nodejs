const express = require('express');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const category = require('./routes/category');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/uploads/',express.static('uploads'));
app.set('view engine', 'ejs');
app.use(expressLayout);

const db = require('./config/db').MongoURI;

mongoose.connect( db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongodb connected");
})
.catch(err => console.log(err));

app.use(category);
app.get('/dashboard', (req, res) => {
    res.render('navbar');
})

const PORT = process.env.PORT || 5600;

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});