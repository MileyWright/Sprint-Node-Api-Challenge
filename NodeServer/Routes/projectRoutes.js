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

router.get('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;
    projectDb.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'Could not retrieve specified ID.'})
    })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id;
    projectDb.getProjectActions(id)
    .then(project => {
        res.status(200).json(project)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not retrieve projects' actions."})
      })
})

router.post('/', validateProject, (req, res) => {
    const data = req.body;
    projectDb.insert(data)
    .then(project => {
        res.status(200).json(project)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not post project data."})
      })
})

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    actionDb.insert({...data, project_id: id})
    .then(project => {
        res.status(200).json(project)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Could not post project actions."})
      })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id;
    projectDb.remove(id)
    .then(removed => {
        res.status(200).json(removed)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "The project could not be removed."})
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