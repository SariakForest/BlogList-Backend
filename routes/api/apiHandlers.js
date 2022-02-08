const db = require("../../mongo/dbHandlers")
const lg = require("../../utils/logger")

exports.getBlogs =(req,res)=>{
    db.getAll().then(blogs=>{
        res.status(200).json(blogs)
    }).catch(err=>{
        lg.err(err)
        res.status(500).json(err)
    })
}

exports.addBlog=(req,res,next)=>{
    db.addItem(req.body).then(newBlog=>{
        res.status(201).json(newBlog)
    }).catch(err=>next(err))
}