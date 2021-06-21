'use strict';

const express = require('express');
const app = express();
const cors = require('cors')
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');
const tsksRouter = require('./routes/tasks')
// Global Middleware
app.use(logger);
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(foodRouter);
app.use(clothesRouter);
app.use(tsksRouter)


function start(){
    app.listen(process.env.PORT, () => {
        console.log(`I'm in port ${process.env.PORT}`)
    })
}
app.use('*', notFoundHandler);
app.use(errorHandler);
module.exports = {
    app,
    start
}