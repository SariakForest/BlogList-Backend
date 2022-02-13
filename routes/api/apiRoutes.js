const apiRoutes = require("express").Router()
const api = require("./apiHandlers")

apiRoutes.get("/",api.getBlogs)
apiRoutes.post("/",api.addBlog)

apiRoutes.delete("/:id",api.deleteBlog)

module.exports = apiRoutes