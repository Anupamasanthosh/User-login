const mongoose=require('mongoose')
const schema=mongoose.Schema
//mongoose.connect("mongodb://localhost:27017/Sampledb")
const UserSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        },
        number:{
            type:String,
            required:true
        }
    }
)
const User=mongoose.model("User",UserSchema)
module.exports=User
