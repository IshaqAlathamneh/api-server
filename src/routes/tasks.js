'use strict';

const express = require('express');
const router = express.Router();
 // class
const Tasks = require('../models/data-collection-class');
const myTask = require('../models/tasks');
//new obj from the class
const TasksInstance = new Tasks(myTask); 

// add my RESTFUL APIs declarations
router.get('/tasks', getTasks);
router.post('/tasks', createTasks);
router.put('/tasks/:id', updateTasks);
router.delete('/tasks/:id', deleteTasks);


async function getTasks(req, res) {
    // get all items
    let items = await TasksInstance.get();
    res.status(200).json(items);
}

// async function getOneTask(req, res) {
//     let id = req.params.id; // from the url its a string
    
//     let oneItem = await TasksInstance.get(id);
//     res.status(200).json(oneItem);
// }

async function createTasks(req, res) {
    // use create Method from the class
    console.log('aaaaa');
    let obj = req.body;
    console.log('my obj-->',obj);
    let newItem = await TasksInstance.create(obj);
    res.status(201).json(newItem);
}

async function updateTasks(req, res) {
    let id = req.params.id;
    const obj = req.body;
    
    let updatedThing = await TasksInstance.update(id, obj);
    res.status(200).json(updatedThing);
}

async function deleteTasks(req, res) {
    let id = req.params.id;
    let deleted = await TasksInstance.delete(id);
    let msg = deleted ? 'Item is deleted' : 'Item was not Found';
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;