const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require("./api-test-helper")
const app = require('../app')

const api = supertest(app)

describe("Request type",()=>{
   
    test("get to '/api/blogs' returns all well formatted", async()=>{
       const response= await api.get("/api/blogs")
                 .expect(200)
                 .expect("Content-Type",/application\/json/)
        
       expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
})
beforeEach(helper.resetDB)
afterAll(() => {
    mongoose.connection.close()
  })