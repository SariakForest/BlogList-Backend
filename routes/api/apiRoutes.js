const apiRoutes = require("express").Router()
const api = require("./apiHandlers")

apiRoutes.get("/",api.getAll)