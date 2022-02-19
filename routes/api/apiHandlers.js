const db = require("../../mongo/dbHandlers")
const bcrypt = require('bcrypt')
const lg = require("../../utils/logger")

// %%%%%% BLOGS %%%%%%%

exports.getBlogs =async(req,res,next)=>{
    try{
       const blogs = await db.getAll("blog")
       res.status(200).json(blogs) 
    }catch(err){
        next(err)
    }
}

exports.getBlog=async(req,res,next)=>{
    try{
        const blog = await db.getSingle(req.params.id,"blog")
        res.status(200).json(blog)
    }catch(err){
        next(err)
    }
}
    
exports.addBlog=async(req,res,next)=>{
    try{
        const newBlog = await db.addBlog(req.body)
        res.status(201).json(newBlog)
    }catch(err){
        next(err)
    }
  
}

exports.deleteBlog=async(req,res,next)=>{
    try{
        const id = req.params.id
        const result =await db.deleteItem(id,"blog")
        res.status(204).json(result)
    }catch(err){
        next(err)
    }
}

exports.updateBlog=async(req,res,next)=>{
    try{
        const id = req.params.id
        const updatedBlog = await db.updateItem(id,req.body,"blog")
        if(!updatedBlog)res.status(404).json({err:"Could not find the entry in database"})
        res.status(200).json(updatedBlog)
    }catch(err){
        next(err)
    }
}

// %%%%%% USERS %%%%%%%
exports.getUsers = async(req,res,next)=>{
    try{
        const users = await db.getAll("user")
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}
exports.addUser=async(req,res,next)=>{
    try{
    const {username,name,password} =req.body
    const userExists = await db.findOne({username},"user")
    if(userExists){
        res.status(400).json({error:"Username already exists"})
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const newUser = await db.addUser({username,name,passwordHash})
    res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
}