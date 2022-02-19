


exports.getAll = async(collection)=>{
    const Item = require(`./models/${collection}`)
    return await Item.find({})
}

exports.getSingle = async(id,collection)=>{
    const Item = require(`./models/${collection}`)
    return await Item.findById(id)
}

exports.addBlog =async({title,author,url,likes})=>{
    const Item = require("./models/blog")
    const newItem =new Item({
        title,author,url,likes
    })
    return await newItem.save()
}
exports.addUser =async({username,name,passwordHash})=>{
    const Item = require("./models/user")
    const newItem =new Item({
        username,name,passwordHash
    })
    return await newItem.save()
}

exports.deleteItem = async(id,collection)=>{
    const Item = require(`./models/${collection}`)
   return await Item.findByIdAndDelete(id)
}

exports.updateItem = async(id,itemToUpdate,collection)=>{
    const Item = require(`./models/${collection}`)
    const opts={
        new:true,
        runValidators:true
    }
    return await Item.findByIdAndUpdate(id,itemToUpdate,opts)
}


// %%%% HELPERS %%%%%

exports.findOne = async(params,collection)=>{
    const Item = require(`./models/${collection}`)
    return await Item.findOne(params)
}

