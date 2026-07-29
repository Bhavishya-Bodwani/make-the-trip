const express=require("express");
const hotel=require("../models/hotel");
const router=express.Router();
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,async(req,res)=>{
    try{
        const {name,location,price,amenities,images,rating}=req.body;  //the code is destructured here 

        const listings= new hotel({
            name:name,
            location:location,
            price:price,
            amenities:amenities,
            images:images,
            rating:rating
        });

        await listings.save();
        res.status(201).json({message:"The data has been successfully destructured and stored",data:listings})
    }catch(error){
        res.status(400).json({message:"There is an internal server error! while storing the data"})
        console.log("error ",error)
    }
});

router.get("/",async(req,res)=>{
    try{
        const collection = await hotel.find({});
        res.status(200).json({message:"user can see the listings available in Db",list:collection});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Can not find the listing !"});
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const collection = await hotel.findById(id);
        
        if(collection==null){
           return res.status(404).json({message:"can not find the listing!"}); // return i have initialized because if not then code will keep executing itself
        }
        res.status(200).json({message:"listing is fetched !",list:collection})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"can not find the listing!"});
    }
})

router.put("/:id",authMiddleware,async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,location,price,amenities,images,rating}=req.body;
        const collection= await hotel.findByIdAndUpdate(id,{name,location,price,amenities,images,rating},{new:true});

        res.status(200).json({message:"Listing has been updated successfully",list:collection});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Cannot modify the listing details !"});
    }
})

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const {id}=req.params;
        const deleted= await hotel.findByIdAndDelete(id);

        if(deleted===null){
            return res.status(404).json({message:"Listing does not exist",list:deleted})
        }
        res.status(200).json({message:"The Listing has been deleted successfully",list:deleted});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Cannot delete the listing"});
    }
})
module.exports=router;