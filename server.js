// ---------------------------- initialization boilerplate

// import dependencies
const express = require('express');
const morgan = require('morgan');
const validator = require('validator');

// create an express app
const app = express();

// use Morgan with dev
app.use(morgan('dev'));


// ---------------------------- routes

// root route
app.get('/', (req, res) => {
    res.send('is this thing on');
});



// ---------------------------- part 1

app.get('/greetings/:userName', (req, res) => {
    res.send(`hello ${req.params.userName}`);
});


// ---------------------------- part 2

app.get('/roll/:rollNum', (req, res) => {
    if (validator.isNumeric(req.params.rollNum)) {
        res.send(`you rolled a ${req.params.rollNum}!`)
    } else {
        res.send(`You must specify a number.`)
    }
});

// ---------------------------- part 3

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    let index = req.params.index;
    if (validator.isInt(index) && index in collectibles) {
        let chosen = collectibles[index];
        res.send(`you want ${chosen.name}? too bad, it cost ${chosen.price}, more than you can afford!`);
    } else {
        res.send(`This item is not yet in stock. Check back soon!`)
    }
});


// ---------------------------- part 4

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {

    let filteredShoes = [...shoes];
    // not sure why, but if I define this with CONST instead of LET I get an error with the filter methods below

    // defining these into variables JUST so they're easier to type everywhere below
    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const type = req.query.type;

    // COULD add validations for the query parameters (isNumber)
    // if (validator.isNumeric(minPrice))

    if (minPrice) {
        console.log(`min price is ${minPrice}`);
        filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
    } else {
        console.log(`no min price`);
    };

    if (maxPrice) {
        console.log(`max price is ${maxPrice}`);
        filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
    } else {
        console.log(`no max price`);
    };

    if (type) {
        console.log(`type is ${type}`);
        filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
    } else {
        console.log(`no type`);
    };

    if (filteredShoes.length === 0) {
        res.send(`sorry, there are no shoes available: min price ${minPrice}, max price ${maxPrice}, and type ${type}`);
    } else {



        res.send(filteredShoes);
    };

});









// ---------------------------- listen for requests

app.listen(3000, () => {
    console.log(`listening on port 3000`);
});