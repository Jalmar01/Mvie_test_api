const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
require('../models')

const BASE_URL = '/api/v1/actors'
let actorId

const actor = {
    firstName:'Jalmar',
    lastName:'Vilarreal',
    nationality:'Ecuador',
    image:'loram35',
    birthday:1995
}


test("POST -> 'BASE_URL',  should return status code 201, res.body to be defined and res.body.name === actor.name", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)

})

test("GET ALL -> 'BASE_URL',  should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})

test("GET ONE -> 'BASE_URL/:id',  should return status code 200, res.body to be defined and and res.body.name === actor.name", async () => {

    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)

})

test("UPDATE -> 'BASE_URL/:id',  should return status code 200, res.body to be defined and and res.body.name === actorUpdate.name", async () => {
    const actorUpdate = {
        firstName:'Ricky',
        lastName:'Martin',
        nationality:'Puerto rico',
        image:'loram35',
        birthday:1980
    }


    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actorUpdate.name)

})


test("DELETE -> 'BASE_URL/:id',  should return status code 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)
       

    expect(res.status).toBe(204)
 
})
