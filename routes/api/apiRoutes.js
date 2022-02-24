const apiRoutes = require("express").Router()
const middleware = require("../../utils/middleware")
const api = require("./apiHandlers")


// %%%%%% BLOGS %%%%%%%
apiRoutes.get("/blogs",api.getBlogs)
apiRoutes.post("/blogs",middleware.userExtractor,api.addBlog)

apiRoutes.get("/blogs/:id",api.getBlog)
apiRoutes.delete("/blogs/:id",middleware.userExtractor,api.deleteBlog)
apiRoutes.put("/blogs/:id",api.updateBlog)

// %%%%%% USERS %%%%%%%
apiRoutes.get("/users",api.getUsers)
apiRoutes.post("/users",api.addUser)

// %%%%%% LOGIN %%%%%%%
apiRoutes.post("/login",api.logUser)

module.exports = apiRoutes