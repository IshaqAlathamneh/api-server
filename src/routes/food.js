'use strict';

const express = require('express');
const router = express.Router();
 // class
const Food = require('../models/data-collection-class');
const myFood = require('../models/food');
//new obj from the class
const foodInstance = new Food(myFood); 

// add my RESTFUL APIs declarations
router.get('/food', getFood);
router.get('/food/:id', getOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);


async function getFood(req, res) {
    // get all items
    let items = await foodInstance.get();
    res.status(200).json(items);
}

async function getOneFood(req, res) {
    let id = req.params.id; // from the url its a string
    console.log(req.params);
    console.log(req.body);
    let oneItem = await foodInstance.get(id);
    res.status(200).json(oneItem);
}

async function createFood(req, res) {
    // use create Method from the class
    let obj = req.body;
    let newItem = await foodInstance.create(obj);
    res.status(201).json(newItem);
}

async function updateFood(req, res) {
    let id = req.params.id;
    const obj = req.body;
    let updatedThing = await foodInstance.update(id, obj);
    res.status(200).json(updatedThing);
}

async function deleteFood(req, res) {
    let id = req.params.id;
    let deleted = await foodInstance.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;