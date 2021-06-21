'use strict';

// Schema from mongoose package;
const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    text : {type: String, required: true},
    assignee: {type: String, required: true},
    difficulty: {type: String, required: true},
    complete: {type: String, enum : ['true', 'false'],  required: true}
});
// a schema is the structure of my object in this collection
// a model is a wrapper for the schema
const taskModel = mongoose.model('tasks', taskSchema);
module.exports = taskModel;