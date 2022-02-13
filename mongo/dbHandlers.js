
const Item = require("./models/blog")

exports.getAll = async()=>{
    return await Item.find({})
}

exports.addItem =async({title,author,url,likes})=>{
    const newItem =new Item({
        title,author,url,likes
    })
    return await newItem.save()
}

exports.deleteItem = async(id)=>{
   return await Item.findByIdAndDelete(id)
}

exports.updateItem = async(id,itemToUpdate)=>{
    const opts={
        new:true,
        runValidators:true
    }
    return await Item.findByIdAndUpdate(id,itemToUpdate,opts)
}