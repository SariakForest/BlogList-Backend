
const Item = require("./models/blog")

exports.getAll = ()=>{
    return Item.find({}).then(result=>result)
}

exports.addItem =({title,author,url,likes})=>{
    const newItem =new Item({
        title,author,url,likes
    })
    return newItem.save().then(result=>result)
}