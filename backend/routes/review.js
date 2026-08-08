const express=require("express");
const router=express.Router();
const review=require("../models/review");
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,async(req,res,next)=>{
    try{
        const {userId,hotelId,rating,reviews}=req.body;

        const reviewListing = new review({
            userId:userId,
            hotelId:hotelId,
            rating:rating,
            reviews:reviews,
        });
        
        await reviewListing.save();
        res.status(201).json({message:"review Listing is added",listing:reviewListing});
    }catch(error){
        next(error);
    }
});

router.get("/",async(req,res,next)=>{
    try{
        const reviewListing=await review.find({});
        if(reviewListing==null){
            return res.status(400).json({message:"There is an error finding the listing"});
        }
        res.status(200).json({message:"Here are all the reviews/ratings",listing:reviewListing});
    }catch(error){
        next(error);
    }
})

router.put("/:id",authMiddleware,async(req,res,next)=>{
    try{
        const {userId,hotelId,rating,reviews}= req.body //without destructuring you can not use it for the findby id and update in the args;
        const {id}=req.params;

        const reviewListing= await review.findByIdAndUpdate(id,{userId,hotelId,rating,reviews},{new:true});

        if(reviewListing==null){
            return res.status(400).json({message:"There is an error updating the listing"});
        }
        res.status(200).json({message:"Your review has been successfully updated",listing:reviewListing});
    }catch(error){
      next(error);
    }
});

router.delete("/:id",authMiddleware,async(req,res,next)=>{
    try{
        const {id} = req.params;

        const reviewListing= await review.findByIdAndDelete(id);

        if(reviewListing==null){
            return res.status(400).json({message:"There is an error deleting the Listing"});
        }
        res.status(200).json({message:"Your listing has been successfully deleted !"});
    }catch(error){
       next(error);
    }
});

module.exports=router;