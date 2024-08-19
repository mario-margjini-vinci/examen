const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');
const jwtSecret = 'ilovemypizza!';
const jwt = require('jsonwebtoken');


const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const jsonDbPath = path.join(__dirname, '/../data/quotes.json');
const jsonDbPath2 = path.join(__dirname, '/../data/ratings.json');

function rateQuote(id,rating,username){
    const ratings = parse(jsonDbPath2);
    const quotes = parse(jsonDbPath); 

    let exists = false;
    quotes.forEach(quote => {
        if(quote.id === id){
            exists = true;
        }   
    });
    if(!exists){
        return undefined;
    }
    ratings.forEach(rating => {
        if(rating.id === id && rating.username == username){
            return undefined;
        }
    });
    const newRating = {
        id,
        rating,
       username,
    };

    ratings.push(newRating);
    serialize(rating);
    return newRating;
}

module.exports = {
    rateQuote
};