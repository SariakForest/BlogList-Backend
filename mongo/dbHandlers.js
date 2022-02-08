
const Blog = require("./models/blog")

exports.getBlogs = ()=>{
    return Blog.find({}).then(blogs=>blogs)
}