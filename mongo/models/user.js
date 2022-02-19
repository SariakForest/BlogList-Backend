const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"No username was given"]
    },
    name:{
        type:String,
        required:[true,"No name was given"]
    },
    passwordHash:String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

const User = mongoose.model("User",userSchema)
module.exports = User