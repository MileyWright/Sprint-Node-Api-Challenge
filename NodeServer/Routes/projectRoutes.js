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



//custom middleware
function  validateProjectId(req, res, next) {
    const id = req.params.id;
    projectDb.get(id)
        .then(project => {
            if(!project) {
                res.status(404).json({error: 'The specified ID does not exist.'})
            } else {
                next();
            }
        })
}

function validateProject(req, res, next) {
    const data = req.body;
    if(!data){
        res.status(400).json({message: 'missing user data.'})
    } else if(!data.name){
        res.status(400).json({message: 'missing required name field.'})
    } else if(!data.description) {
        res.status(400).json({message: 'missing required description field.'})
    } else {
        next();
    }
}

function validateAction(req, res, next) {
    const data = req.body;
    if(!data){
        res.status(400).json({message: 'missing action data.'})
    } else if(!data.notes || !data.description){
        res.status(400).json({message: 'missing required notes and/or description field'})
    } else {
        next();
    }
}

module.exports = router;