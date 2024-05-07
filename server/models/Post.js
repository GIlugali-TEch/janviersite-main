const mongo = require("mongoose")


const postBlog= mongo.Schema({
    title:{
        type:String,
        required:true
    },

    body:{
        type:String,
        required:true
    },
    
    createdAt:{
        type:Date,
        default: Date.now()
    },

    updateAt:{
        type:Date,
        default: Date.now()
    }
})


module.exports = mongo.model("Post",postBlog )