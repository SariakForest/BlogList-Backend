
const Item = require("./models/blog")

exports.getAll = async()=>{
    return await Item.find({})
}

exports.addItem =({title,author,url,likes})=>{
    const newItem =new Item({
        title,author,url,likes
    })
    return newItem.save().then(result=>result)
}