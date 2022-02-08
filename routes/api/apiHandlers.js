const db = require("../../mongo/dbHandlers")
const lg = require("../../utils/logger")

exports.getAll((req,res)=>{
    db.getBlogs.then(blogs=>{
        res.status(200).json(blogs)
    }).catch(err=>{
        lg.err(err)
        res.status(500).json(err)
    })
})