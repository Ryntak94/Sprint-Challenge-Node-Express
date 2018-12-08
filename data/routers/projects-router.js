const express = require('express');
const router = express.Router();
const projectsDB = require('../helpers/projectModel.js');

router.get('', (req, res) =>  {
    projectsDB.get()
        .then((projects)   =>  {
            res
            .json(projects)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The project list could not be retrieved." });
        });
})

router.get('/:id', (req, res)   =>  {
    const { id } = req.params;
    projectsDB.get(id)
        .then((project)  =>  {
            res
            .json(project)
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ message: "The project with the specified ID could not be retrieved." });
        })
})

router.post('', (req, res)  =>  {
    const { name, description }  =   req.body;
    let completed = false
    if(req.body.completed)  {
        completed = req.body.completed
    }
    const obj = { name, description, completed };
    if(name === "" || name === undefined || description === "" || description === undefined)    {
        return res
        .status(400)
        .json({ errorMessage: "Please provide a name and description for the post." });
    }   else {
        projectsDB.insert(obj)
            .then((item)    =>  {
                res
                .status(201)
                .json(item);
            })
            .catch((err)    =>  {
                res
                .status(500)
                .json({ message: "There was an error adding your post"});
            })
    }
})

router.put('/:id', (req, res)   =>  {
    const { id }    =   req.params;
    const { name, description }  =   req.body;
    let completed = false
    if(req.body.completed)  {
        completed = req.body.completed
    }
    const obj = { name,  description, completed };
    if(name === "" || name === undefined || description === "" || description === undefined)    {
        return res
        .status(400)
        .json({ errorMessage: "Please provide a name and description for the post." });
    }   else {
        projectsDB.update(id, obj)
            .then((count)    =>  {
                if(count === 0 )    {
                    res
                    .status(404)
                    .json({ message: "The project with the specified ID does not exist." })
                }   else {
                    projectsDB.get(id)
                        .then(project  =>  {
                            res
                            .json(project)
                        })
                }
            })
            .catch((err)    =>  {
                res
                .status(500)
                .json({ message: "There was an error updating your project"});
            })
    }
})

router.delete("/:id", (req, res)    =>  {
    const { id }    =   req.params;
    projectsDB.remove(id)
        .then((count)    =>  {
            if(count === 0) {
                res
                .status(404)
                .json({ message: "The project with the specified ID does not exist." })
            }   else {
                res
                .json({ message: "Success!"})
            }
        })
        .catch(err  =>  {
            res
            .status(500)
            .json({ error: "The project could not be removed" })
        })
})

module.exports = router;
