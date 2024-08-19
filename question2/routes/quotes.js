const express = require('express');

const { rateQuote } = require("../models/quotes");
const { authorize } = require("../utils/auths");

const router = express.Router();


router.post('/', authorize, (req,res) =>{
    const idQuote = req?.body?.idQuote;
    const score = req?.body?.score;
    const username =  req.user.username;
    if (!idQuote || !score || score < 0 || score > 10 || !username) {
        return res.sendStatus(400);
      }

    const newRating = rateQuote(idQuote,score,username);

    if(!newRating) return res.sendStatus(404);

    return res.json(newRating);
    

});

module.exports = router;