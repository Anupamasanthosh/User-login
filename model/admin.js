const mongoose=require('mongoose')
const schema=mongoose.Schema
//mongoose.connect("mongodb://localhost:27017/Sampledb")
const AdminSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        }
       
    }
)
const Admin=mongoose.model("Admin",AdminSchema)
module.exports=Admin
