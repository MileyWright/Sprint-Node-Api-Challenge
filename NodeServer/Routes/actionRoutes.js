const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel');

router.use(express.json());

    //  /actions
    router.get('/', (req, res) => {
        actionDb.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Trouble accessing the actions"})
        })
    })


//custom middleware
function validateAction(req,res,next) {
    const data = req.body;
    if(!data){
        res.status(400).json({errorMessage: 'missing action data'})
    } else if(!data.description || !data.notes) {
        res.status(400).json({errorMessage:'missing required description and/or notes'})
    } else {
        next();
    }
}

function validateActionById(req, res, next) {
    const id = req.params.id;
    actionDb.get(id)
    .then(action => {
        if(!action) {
            res.status(404).json({error: "The specified ID does not exist."})
        } else {
            next();
        }
    })
}

    module.exports = router;