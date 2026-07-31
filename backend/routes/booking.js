const express=require("express");
const router=express.Router();
const booking=require("../models/booking")
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,async(req,res)=>{
    try{
        const {name,userId,hotelId,from,to,people,paymentType,finalPrice,email,phoneNo}=req.body; //destructured

        const bookedListings= new booking({
            name:name,
            userId:userId,
            hotelId:hotelId,
            from:from,
            to:to,
            people:people,
            paymentType:paymentType,
            finalPrice:finalPrice,
            email:email,
            phoneNo:phoneNo
        });

        await bookedListings.save()
        res.status(201).json({message:"Booking has been confirmed successfully!",data:bookedListings});
    }catch(error){
        console.log(error);
        res.status(400).json({message:"some error is there"});
    }
});

router.get("/:id",authMiddleware,async(req,res)=>{
    try{
        const {id}=req.params;
        const bookedListings= await booking.findById(id);
    
        if(bookedListings===null){
            return res.status(404).json({message:"There is no booking info"});
        }
        res.status(200).json({message:"Here is your booking !",listing:bookedListings});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"There is no booking !"});
    } 
});

module.exports=router;