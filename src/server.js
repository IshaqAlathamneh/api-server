'use strict';

const express = require('express');
const app = express();
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

// Global Middleware
app.use(logger);
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(foodRouter);
app.use(clothesRouter);


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