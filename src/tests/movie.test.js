const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require('../models')

const BASE_URL = '/api/v1/movies'

let movieId
const movie = {
    name:"Una histori sin fin",
    image:"lorem78",
    synopsis:"lorem90",
    releaseYear:2004
}

test("POST -> 'BASE_URL',  should return status code 201, res.body to be defined and res.body.name === movie.name", async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)

})

test("GET ALL -> 'BASE_URL',  should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

 expect(res.body[0].actors).toBeDefined()
 expect(res.body[0].actors).toHaveLength(0)
 expect(res.body[0].directors).toBeDefined()
 expect(res.body[0].directors).toHaveLength(0)
 expect(res.body[0].genres).toBeDefined()
 expect(res.body[0].genres).toHaveLength(0)



})

test("GET ONE -> 'BASE_URL/:id',  should return status code 200, res.body to be defined and and res.body.name === movie.name", async () => {

    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)


 expect(res.body.actors).toBeDefined()
 expect(res.body.actors).toHaveLength(0)
 expect(res.body.directors).toBeDefined()
 expect(res.body.directors).toHaveLength(0)
 expect(res.body.genres).toBeDefined()
 expect(res.body.genres).toHaveLength(0)
})

test("UPDATE -> 'BASE_URL/:id',  should return status code 200, res.body to be defined and and res.body.name === movieUpdate.name", async () => {
    const movieUpdate = {
        name:"Una historia con final epico",
    }


    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)
       

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)

})

test("POST -> 'BASE_URL/:id/actors', should return status code 200, res.body to be defined aand res.body.length === 1", async() => {
    const actor = {
        firstName:'Ricky',
        lastName:'Martin',
        nationality:'Puerto rico',
        image:'loram35',
        birthday:1980
    }
    const createActor = await Actor.create(actor)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([createActor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createActor.id)

    await createActor.destroy()
})

test("POST -> 'BASE_URL/:id/directors', should return status code 200, res.body to be defined aand res.body.length === 1", async () => {
    const director = {
        firstName:'Jalmar',
        lastName:'Vilarreal',
        nationality:'Ecuador',
        image:'loram35',
        birthday:1995
    }
    const createDirector = await Director.create(director)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([createDirector.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createDirector.id)

    await createDirector.destroy()
})

test("POST -> 'BASE_URL/:id/genres', should return status code 200, res.body to be defined aand res.body.length === 1", async () => {
    const genre = {
        name:'terror'
      
    }
    const createGenre = await Genre.create(genre)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([createGenre.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(createGenre.id)

    await createGenre.destroy()
})

test("DELETE -> 'BASE_URL/:id',  should return status code 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)
       

    expect(res.status).toBe(204)
 
})
