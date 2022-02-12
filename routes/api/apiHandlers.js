const db = require("../../mongo/dbHandlers")
const lg = require("../../utils/logger")

exports.getBlogs =async(req,res,next)=>{
    try{
       const blogs = await db.getAll()
       res.status(200).json(blogs) 
    }catch(err){
        next(err)
    }
}
    
   

exports.addBlog=(req,res,next)=>{
    db.addItem(req.body).then(newBlog=>{
        res.status(201).json(newBlog)
    }).catch(err=>next(err))
}