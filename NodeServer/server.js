const express = require('express');

const projectRouter = require('./Routes/projectRoutes');
const actionRouter = require("./Routes/actionRoutes");

const server = express();

server.get('/', (req, res) => {
    res.send(`Welcome to my API`)
});

server.use(express.json());
server.use(logger);
server.use('/projects',projectRouter);
server.use('/actions', actionRouter);

 function logger(req,res, next) {
    const {method, originalUrl} = req;
    console.log(`${method} to ${originalUrl} at [${new Date().toISOString()}]`)
    next();
 }
module.exports = server;