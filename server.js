// ---------------------------- initialization boilerplate

// import dependencies
const express = require('express');
const morgan = require('morgan');

// create an express app
const app = express();

// use Morgan with dev
app.use(morgan('dev'));



// ---------------------------- routes

// root route
app.get('/', (req, res) => {
    res.send('is this thing on');
});














app.listen(3000, () => {
    console.log(`listening on port 3000`);
});