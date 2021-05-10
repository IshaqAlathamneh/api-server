'use strict';

// Schema from mongoose package;
const mongoose = require('mongoose');
const clothesSchema = mongoose.Schema({
    name : {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String, enum : ['S', 'M', 'L', 'XL'] }
});
// a schema is the structure of my object in this collection
// a model is a wrapper for the schema
const clothesModel = mongoose.model('clothes', clothesSchema);
module.exports = clothesModel;