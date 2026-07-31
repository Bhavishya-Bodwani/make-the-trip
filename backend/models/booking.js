const mongoose= require("mongoose");

const bookingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel",
    },
    from:{
        type:Date,
        required:true,
    },
    to:{
        type:Date,
    },
    people:{
        type:Number,
        required:true,
    },
    paymentType:{
        type:String,
        required:true
    },
    finalPrice:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
    }
});

const booking=mongoose.model("booking",bookingSchema);

module.exports=booking;