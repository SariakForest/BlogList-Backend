const apiRoutes = require("express").Router()
const api = require("./apiHandlers")


// %%%%%% BLOGS %%%%%%%
apiRoutes.get("/blogs",api.getBlogs)
apiRoutes.post("/blogs",api.addBlog)

apiRoutes.get("/blogs/:id",api.getBlog)
apiRoutes.delete("/blogs/:id",api.deleteBlog)
apiRoutes.put("/blogs/:id",api.updateBlog)

// %%%%%% USERS %%%%%%%
apiRoutes.get("/users",api.getUsers)
apiRoutes.post("/users",api.addUser)

// %%%%%% LOGIN %%%%%%%
apiRoutes.post("/login",api.logUser)

module.exports = apiRoutes