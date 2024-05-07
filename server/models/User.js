const mongo = require('mongoose')

const userSchema = mongo.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    }
})

module.exports = mongo.model("user", userSchema)