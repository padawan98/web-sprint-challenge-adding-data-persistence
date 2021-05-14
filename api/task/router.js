// build your `/api/tasks` router here
const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/tasks', (req, res, next) => {
    helpers.getTasks()
        .then(rss => {
            res.status(200).json(rss);
        })
        .catch(next);
});

router.post('/tasks', (req, res, next) =>{
    helpers.postTasks(req.body)
        .then(rss =>{
            res.status(201).json(rss);
        })
        .catch(next);
})

module.exports = router;