// build your `/api/projects` router here
const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/projects', (req, res, next) => {
    helpers.getProjects()
        .then(rss => {
            res.status(200).json(rss);
        })
        .catch(next);
});

router.post('/projects', (req, res, next) =>{
    helpers.postProjects(req.body)
        .then(rss =>{
            res.status(201).json(rss);
        })
        .catch(next);
})

module.exports = router;