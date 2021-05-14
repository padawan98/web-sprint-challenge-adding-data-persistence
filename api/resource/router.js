// build your `/api/resources` router here
const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/resources', (req, res, next) => {
    helpers.getResources()
        .then(rss => {
            res.status(200).json(rss);
        })
        .catch(next);
});

router.post('/resources', (req, res, next) =>{
    helpers.postResources(req.body)
        .then(rss =>{
            res.status(201).json(rss);
        })
        .catch(next);
})

module.exports = router;