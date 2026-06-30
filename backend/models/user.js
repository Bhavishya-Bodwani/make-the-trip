const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true // Enforces a unique index on this field 
    },
    password:{
        type:String,
        required:true,
        // unique:true because i am using salting + hashing so password will automatically be unique 
    }
})

const user=mongoose.model("user",userSchema);

module.exports=user
