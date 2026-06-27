const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true // Enforces a unique index on this field 
    },
    password:String
})

const user=mongoose.model("user",userSchema);

module.exports=user
