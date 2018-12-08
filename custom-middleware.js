const maxNameLength = (req, res, next)  =>  {
    const name = req.body.name;
    if(name === undefined)  {
        next();
    }   else if(name.length > 128)   {
        res.status(422).json({ message: "Name is too long. Please submit a shorter name."});
    }   else {
        next();
    }
}

const completedIsBoolean = (req, res, next) =>  {
    const { completed } = req.body;
    if(completed === undefined)    {
        next();
    }   else if(typeof completed !== "boolean")   {
        res.status(422).json({ message: "Please make sure 'completed' is a boolean (true or false)." });
    }   else {
        next();
    }
}

const descriptionIsString = (req, res, next)    =>  {
    const { description }   =   req.body;
    console.log()
    if(description === undefined)   {
        next();
    }   else if(typeof description !== "string")   {
        res.status(422).json( { message: "Please make sure the description is a String." });
    }   else {
        next();
    }
}

module.exports.maxNameLength = maxNameLength;
module.exports.completedIsBoolean = completedIsBoolean;
module.exports.descriptionIsString = descriptionIsString;
