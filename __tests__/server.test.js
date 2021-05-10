'use strict';

const server = require('../src/server');
// server.app -> mock this server -> I dont have to run it here
const superTest = require('supertest');
const serverRequest = superTest(server.app);// this will be my fake server

describe('Testing Server Module', ()=> {
    let consoleSpy;
    beforeEach(()=> {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    
    // after the tests
    afterEach(()=> {
        consoleSpy.mockRestore();
    });
    it('404 on a bad route', async ()=> {
        let response = await serverRequest.get('/not-found-route');
        expect(response.status).toEqual(404);
    });
    it('404 on a bad method', async ()=> {
        let response = await serverRequest.post('/person');
        expect(response.status).toEqual(404);
    });

    it('Create a record using POST', async ()=> {
        let response = await serverRequest.post('/clothes').send({
            name : 'bloozeh',
            price: 20,
            size: 'L'
        });
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual("bloozeh");
        expect(response.body.price).toEqual(20);
        
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
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual("aaa");
        expect(response.body[0].calories).toEqual(50);
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
        let response = await serverRequest.get('/food/1')
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual("aaa");
        expect(response.body.calories).toEqual(50);
    });
    it('Update a record using PUT', async ()=> {
        // let myPost = await serverRequest.post('/food').send({
        //     name : 'bloozeh',
        //     calories: 20,
            
        // }).send({
        //     name : 'pants',
        //     calories: 500
        // });
        let response = await serverRequest.put('/food/1').send({
            name : 'aaa',
            calories: 50,
            type: 'FRUIT'
        });
        expect(response.status).toEqual(200);
        expect(response.body.type).toEqual("FRUIT");
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
        let response = await serverRequest.delete('/clothes/1')
        expect(response.status).toEqual(202);
        expect(response.body.deleted).toEqual(true);
        
    });
});