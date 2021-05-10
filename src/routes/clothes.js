'use strict';

const express = require('express');
const router = express.Router();
 // class
const Clothes = require('../models/data-collection-class');
const myClothes = require('../models/clothes');
//new obj from the class
const clothesInstance = new Clothes(myClothes); 

// add my RESTFUL APIs declarations
router.get('/clothes', getClothes);
router.get('/clothes/:id', getOneClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', updateClothes);
router.delete('/clothes/:id', deleteClothes);


async function getClothes(req, res) {
    // get all items
    let items = await clothesInstance.get();
    res.status(200).json(items);
}

async function getOneClothes(req, res) {
    let id = req.params.id; // from the url its a string
    
    let oneItem = await clothesInstance.get(id);
    res.status(200).json(oneItem);
}

async function createClothes(req, res) {
    // use create Method from the class
    let obj = req.body;
    console.log('my obj-->',obj);
    let newItem = await clothesInstance.create(obj);
    res.status(201).json(newItem);
}

async function updateClothes(req, res) {
    let id = req.params.id;
    const obj = req.body;
    
    let updatedThing = await clothesInstance.update(id, obj);
    res.status(200).json(updatedThing);
}

async function deleteClothes(req, res) {
    let id = req.params.id;
    let deleted = await clothesInstance.delete(id);
    let msg = deleted ? 'Item is deleted' : 'Item was not Found';
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;