const apiRoutes = require("express").Router()
const api = require("./apiHandlers")

apiRoutes.get("/",api.getBlogs)
apiRoutes.post("/",api.addBlog)

module.exports = apiRoutes