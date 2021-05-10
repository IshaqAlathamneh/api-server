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
            name: "ishaq",
            level: 2040
        });
        expect(response.status).toEqual(201);
        expect(response.body.record.name).toEqual("ishaq");
        expect(response.body.record.level).toEqual(2040);
        
    });

    it('Read a list of records using GET', async ()=> {
        let myPost = await serverRequest.post('/clothes').send({
            name: "ishaq",
            level: 2040
        }).send({
            name: "gaga",
            level: 1
        });
        let response = await serverRequest.get('/clothes')
        expect(response.status).toEqual(200);
        expect(response.body[0].record.name).toEqual("ishaq");
        expect(response.body[0].record.level).toEqual(2040);
        expect(response.body.length).toEqual(2);
    });
    it('Read a record using GET', async ()=> {
        let myPost = await serverRequest.post('/clothes').send({
            name: "ishaq",
            level: 2040
        }).send({
            name: "gaga",
            level: 1
        });
        let response = await serverRequest.get('/clothes/1')
        expect(response.status).toEqual(200);
        expect(response.body.record.name).toEqual("ishaq");
        expect(response.body.record.level).toEqual(2040);
    });
    it('Update a record using PUT', async ()=> {
        let myPost = await serverRequest.post('/food').send({
            name: "ishaq",
            level: 2040
        }).send({
            name: "gaga",
            level: 1
        });
        let response = await serverRequest.put('/food/1').send({
            name: "gaga",
            level: 7
        });
        expect(response.status).toEqual(200);
        expect(response.body.record.name).toEqual("gaga");
        expect(response.body.record.level).toEqual(7);
    });
    it('Destroy a record using DELETE', async ()=> {
        let myPost = await serverRequest.post('/clothes').send({
            name: "ishaq",
            level: 2040
        }).send({
            name: "gaga",
            level: 1
        });
        let response = await serverRequest.delete('/clothes/1')
        expect(response.status).toEqual(202);
        expect(response.body.deleted).toEqual(true);
        
    });
});