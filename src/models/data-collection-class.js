'use strict';

class ModelCollection {
    constructor(model) {
        this.model = model;
    }

    get(_id) {
        if (_id) {
            return this.model.findById(_id);
        } else {
            return this.model.find({});
        }
    }

    getBy(obj) {
        return this.model.find(obj);
    }

    create(obj) {
        console.log('111111');
        let newRecord = new this.model(obj);
        console.log('22222');
        newRecord.save();
        console.log('3333');
        return newRecord;
    }

    update(_id, obj) {
        return this.model.findByIdAndUpdate(_id, obj, {new:true});
    }

    delete(_id) {
        return this.model.findByIdAndDelete(_id);
    }
}

module.exports = ModelCollection;