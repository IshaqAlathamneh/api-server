'use strict';
require('@code-fellows/supergoose');
const server = require('../src/server');
// server.app -> mock this server -> I dont have to run it here
// const server = require('../src/server');
// server.app -> mock this server -> I dont have to run it here
const superTest = require('supertest');
const serverRequest = superTest(server.app);// this will be my fake server
const Collection = require('../src/models/data-collection-class');
const foodModel = require('../src/models/food');
const clothesModel = require('../src/models/clothes');
const food = new Collection(foodModel);
const clothes = new Collection(clothesModel);

describe('Testing Server Module', ()=> {
    let consoleSpy;
    let myId;
    // beforeEach(()=> {
    //     consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    // });
    
    // // after the tests
    // afterEach(()=> {
    //     consoleSpy.mockRestore();
    // });
    it('404 on a bad route', async ()=> {
        let response = await serverRequest.get('/not-found-route');
        expect(response.status).toEqual(404);
    });
    it('404 on a bad method', async ()=> {
        let response = await serverRequest.post('/person');
        expect(response.status).toEqual(404);
    });

    it('Create a record using POST', async ()=> {
        let obj = {name: 'bloozeh', calories: 99, type: 'FRUIT'};
        let newItem = await food.create(obj);
        myId = newItem._id
        console.log('my id ', myId);
        console.log('my item ', newItem);
        // expect(newItem.status).toEqual(201);
        expect(newItem.name).toEqual("bloozeh");
        expect(newItem.calories).toEqual(99);
        
    });

    it('Read a list of records using GET', async ()=> {
        // let myPost = await serverRequest.post('/clothes').send({
        //     name : 'bloozeh',
        //     price: 20,
        //     size: 'L'
        // }).send({
        //     name : 'pants',
        //     price: 20,
        //     size: 'L'
        // });
        let response = await serverRequest.get('/food')
        console.log(response);
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual("bloozeh");
        expect(response.body[0].calories).toEqual(99);
        // expect(response.body.length).toEqual(3);
    });
    it('Read a record using GET', async ()=> {
        // let myPost = await serverRequest.post('/clothes').send({
        //     name : 'bloozeh',
        //     price: 20,
        //     size: 'L'
        // }).send({
        //     name : 'pants',
        //     price: 20,
        //     size: 'L'
        // });
        let response = await serverRequest.get(`/food/${myId}`)
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual("bloozeh");
        expect(response.body.calories).toEqual(99);
    });
    it('Update a record using PUT', async ()=> {
        // let myPost = await serverRequest.post('/food').send({
        //     name : 'bloozeh',
        //     calories: 20,
            
        // }).send({
        //     name : 'pants',
        //     calories: 500
        // });
        let response = await serverRequest.put(`/food/${myId}`).send({
            name : 'aaa',
            calories: 50,
            type: 'L'
        });
        expect(response.status).toEqual(200);
        expect(response.body.type).toEqual("L");
        // expect(response.body.price).toEqual(500);
    });
    it('Destroy a record using DELETE', async ()=> {
        // let myPost = await serverRequest.post('/clothes').send({
        //     name : 'bloozeh',
        //     price: 20,
        //     size: 'L'
        // }).send({
        //     name : 'pants',
        //     price: 20,
        //     size: 'L'
        // });
        let response = await serverRequest.delete(`/food/${myId}`)
        console.log(response);
        expect(response.status).toEqual(202);
        expect(response.body.msg).toEqual('Item is deleted');
        
    });
});