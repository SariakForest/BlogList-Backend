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
    test("post to '/api/blogs' saves the new blog", async()=>{
        const response= await api.post("/api/blogs")
                .send(helper.testBlog)
                .expect(201)
                .expect("Content-Type",/application\/json/)
        expect(response.body.title).toBe(helper.testBlog.title)
        expect(await helper.blogsInDB()).toHaveLength(helper.initialBlogs.length + 1)
    })
    
})
describe("Validation:",()=>{
    test("Id property is send instead of _id", async()=>{
        const response= await api.get("/api/blogs")
        expect(response.body[0].id).toBeDefined()
    })
    test("When new blog is added, likes, if missing, defaults to 0",async()=>{
        const {likes,...noLikesBlog} = helper.testBlog
        const response= await api.post("/api/blogs")
                .send(noLikesBlog)
                .expect(201)
                .expect("Content-Type",/application\/json/)
       
        expect(response.body).toEqual({...response.body,likes:0})
    })
    test("When new blog is added if title and url are missing, status 400",async()=>{
        const {url, title, ...noUrlOrTitle} = helper.testBlog
        await api.post("/api/blogs")
                .send(noUrlOrTitle)
                .expect(400)
        expect(await helper.blogsInDB()).toHaveLength(helper.initialBlogs.length)
    })

})
beforeEach(helper.resetDB)
afterAll(() => {
    mongoose.connection.close()
  })