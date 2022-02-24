const db = require("../../mongo/dbHandlers")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const lg = require("../../utils/logger")

// --------------------%%%%%% BLOGS %%%%%%%---------------------------

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
    
exports.addBlog = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" })
    }
    const user = await db.getSingle(decodedToken.id, "user")
    const newBlog = await db.addBlog(req.body, user)
    res.status(201).json(newBlog)
  } catch (err) {
    next(err)
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    const authUser = await db.getSingle(decodedToken.id, "user");
    const blog = await db.getSingle(id, "blog");
    console.log("User", authUser);
    console.log("creator", blog.user);
    if (authUser._id.toString() === blog.user.toString()) {
      const result = await db.deleteItem(id, "blog");
      res.status(204).json(result);
    }
    res.status(400).json({ error: "Only OP can delete his entry" });
  } catch (err) {
    next(err);
  }
};

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




// --------------------%%%%%% USERS %%%%%%%---------------------------

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
    if(!password)res.status(400).json({error:"No password was given"})
    if(password.length < 3){
        res.status(400).json({error:"Password is too short"})
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const newUser = await db.addUser({username,name,passwordHash})
    res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
}



// --------------------%%%%%% LOGIN %%%%%%%---------------------------

exports.logUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await db.findOne({ username },"user");
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "Invalid password or username",
      });
    }

    const tokenUser = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(tokenUser, process.env.SECRET);
    
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
};