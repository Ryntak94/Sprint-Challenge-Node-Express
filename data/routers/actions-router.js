const express = require('express');
const router = express.Router();
const actionsDB = require('../helpers/actionModel.js');

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

module.exports = router;
