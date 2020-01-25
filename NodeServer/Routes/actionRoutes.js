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

    module.exports = router;