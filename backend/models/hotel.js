const mongoose=require("mongoose");

const hotelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    amenities:{
        type:[String],
    },
    images:{
        type:[String],
    },
    rating:{
        type:Number,
    }
});

const hotel=mongoose.model('hotel',hotelSchema)

module.exports=hotel;

