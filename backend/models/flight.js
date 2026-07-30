const mongoose=require("mongoose");

const flightSchema=new mongoose.Schema({
    flightNumber:{
        type:Number,
        required:true,
    },
    airline:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    departureTime:{
        type:Date,
        required:true,
    },
    arrivalTime:{
        type:Date,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    seats:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    returnDate:{
        type:Date,
    },
});

const flight=mongoose.model('flight',flightSchema);

module.exports=flight;