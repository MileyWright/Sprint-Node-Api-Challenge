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

router.get('/:id', validateActionById, (req, res) => {
    const id = req.params.id;
    actionDb.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not retrieve specified ID"})
    })
})

router.delete("/:id", validateActionById, (req, res) => {
    const id = req.params.id;
    actionDb.remove(id)
    .then(deleted => {
        res.status(200).json({deleted})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'The action could not be removed'})
    })
})

router.put('/:id', validateActionById, validateAction, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    actionDb.update(id, data)
    .then( action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: "Action was not updated."})
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