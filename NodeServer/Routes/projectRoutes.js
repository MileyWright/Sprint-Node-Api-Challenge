const express = require('express');

const router = express.Router();
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');
router.use(express.json());

//  /projects
router.get('/', (req, res) => {
    projectDb.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'Trouble accessing the projects.'})
    })
})

module.exports = router;