const request = require('supertest')
const app = require('../app')
require('../models')

const BASE_URL = '/api/v1/directors'
let directorId 
const director = {
    firstName:'Jalmar',
    lastName:'Vilarreal',
    nationality:'Ecuador',
    image:'loram35',
    birthday:1995
}

test("POST -> 'BASE_URL', should return status code 201, res.body to be defined and res.body.name === director.name", async () => {

  const res = await request(app)
   .post(BASE_URL)
   .send(director)

   directorId = res.body.id 

   expect(res.status).toBe(201)
   expect(res.body).toBeDefined()
   expect(res.body.name).toBe(director.name)
})

test("GET ALL -> 'BASE_URL', should return status code 200, res.body to be defined and res.body.length === 1", async () => {

    const res = await request(app)
     .get(BASE_URL)
    
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
  })
  
  test("GET One -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name === director.name", async () => {

    const res = await request(app)
     .get(`${BASE_URL}/${directorId}`)
    
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(director.name)
  })
  
  test("UPDATE -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name === directorUpdate.name", async () => {

    const directorUpdate = {
        firstName:'Ricky',
        lastName:'Martin',
        nationality:'Puerto rico',
        image:'loram35',
        birthday:1980
    }

    const res = await request(app)
     .put(`${BASE_URL}/${directorId}`)
     .send(directorUpdate)
    
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(directorUpdate.name)
  })

  test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {

    const res = await request(app)
     .delete(`${BASE_URL}/${directorId}`)
    
     expect(res.status).toBe(204)
  })
