const mongoose= require("mongoose");

const reviewSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel"
    },
    rating:{
        type:Number,
        required:true,
    },
    reviews:{
        type:String,
        required:true,
    }
});

const review=mongoose.model("review",reviewSchema);

module.exports=review;

