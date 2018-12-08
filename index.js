const express = require('express');
const helmet = require('helmet');
const actionRouter = require('./data/routers/actions-router.js');
const projectRouter = require('./data/routers/projects-router.js');
const server = express();
const parser = express.json();
const PORT = "4000"

server.use(helmet());
server.use(parser);
server.use("/api/actions", actionRouter);
//server.use("/api/projects", projectRouter);

server.listen(PORT, ()  =>  {
    console.log("Server listening on port:", PORT);
})
