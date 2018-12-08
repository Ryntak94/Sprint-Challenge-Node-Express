const express = require('express');
const router = express.Router();
const actionsDB = require('../helpers/actionModel.js');
const projectsDB = require('../helpers/projectModel.js')

router.get('', (req, res) =>  {
    actionsDB.get()
        .then((actions)   =>  {
            res
            .json(actions)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The action list could not be retrieved." });
        });
})

router.get('/:id', (req, res)   =>  {
    const { id } = req.params;
    actionsDB.get(id)
        .then((action)  =>  {
            res
            .json(action)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The action with the specified ID could not be retrieved." });
        })
})

router.post('',   (req, res)  =>  {
    const { project_id, description, notes }  =   req.body;
    let completed = false;
    if(req.body.completed)  {
        completed = req.body.completed;
    }
    const obj = { project_id, notes, description, completed };
    projectsDB.get()
        .then(projects =>  {
            let projectIds = projects.map((project)    =>  {
                return project.id
            })
            if(description === "" || description === undefined || notes === "" || notes === undefined || project_id === undefined) {
                return res
                .status(400)
                .json({ errorMessage: "Please provide a project Id, notes and description for this action." })
            }   else if (projectIds.includes(project_id) === false) {
                return res
                    .status(404)
                    .json( { message: "Please provide a valid project ID." })
            }   else {
                actionsDB.insert(obj)
                    .then((action)    =>  {
                        res
                        .status(201)
                        .json(action);
                    })
                    .catch(err  =>  {
                        res
                        .status(500)
                        .json({ message: "There was an error adding your action." });
                    })
            }
        })
})

router.put('',  (req, res)  =>  {
    const { project_id, description, notes, id }  =   req.body;
    let completed = false;
    if(req.body.completed)  {
        completed = req.body.completed;
    }
    const obj = { project_id, notes, description, completed };
    actionsDB.get(id)
        .then(()    =>  {
            actionsDB.update(id, obj)
                .then((count)    =>  {
                        actionsDB.get(id)
                            .then(action  =>  {
                                res
                                .json(action)
                            })
                })
                .catch(err  =>  {
                    res
                    .status(500)
                    .json({ message: "The action could not be updated" });
                })
        })
        .catch(err  =>  {
            res
            .status(404)
            .json({ message: "The action with the specified ID does not exist." })
        })
})

router.delete("/:id", (req, res)  =>  {
    const { id } = req.params;
    actionsDB.remove(id)
        .then((count)    =>  {
            if(count === 0) {
                res
                .status(404)
                .json({ message: "The action with the specified ID does not exist." })
            }   else {
                res
                .json({ message: "Success!"})
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "The action could not be removed" })
        })
})

module.exports = router;
