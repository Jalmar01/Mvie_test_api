const request = require('supertest')
const app = require('../app')
require('../models')

const BASE_URL = '/api/v1/genres'

let genreId 
const genre = {
    name:"acction"
}

test("POST -> 'BASE_URL',  should return status code 201, res.body to be defined and res.body.name === genre.name", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)

})

test("GET ALL -> 'BASE_URL',  should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})

test("GET ONE -> 'BASE_URL/:id',  should return status code 200, res.body to be defined and and res.body.name === genre.name", async () => {

    const res = await request(app)
        .get(`${BASE_URL}/${genreId}`)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)

})

test("UPDATE -> 'BASE_URL/:id',  should return status code 200, res.body to be defined and and res.body.name === genreUpdate.name", async () => {
    const genreUpdate = {
        name:'Terror'
    }


    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)

})

test("DELETE -> 'BASE_URL/:id',  should return status code 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)
       

    expect(res.status).toBe(204)
 
})

