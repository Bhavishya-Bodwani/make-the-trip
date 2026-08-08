const express=require("express");
const hotel=require("../models/hotel");
const router=express.Router();
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,async(req,res,next)=>{
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
       next(error)
    }
});

router.get("/",async(req,res,next)=>{
    try{
        const {locationSearched}=req.query;
        const {minPrice,maxPrice}=req.query;
        const filter=locationSearched ? {location:locationSearched}:{};
        const pricefilter={};
        if(minPrice){
            pricefilter.$gte=Number(minPrice)
        }
        if(maxPrice){
            pricefilter.$lte=Number(maxPrice)   
        }
        const filterPrice=Object.keys(pricefilter).length?{price:pricefilter}:{};
        const combined={...filter,...filterPrice}
        const returnSearch= await hotel.find(combined);

        res.status(200).json({message:"user can see the listings available in Db",list:returnSearch});
    }catch(error){
        next(error);
    }
})

router.get("/:id",async(req,res,next)=>{
    try{
        const {id}=req.params;
        const collection = await hotel.findById(id);

        if(collection==null){
           return res.status(404).json({message:"can not find the listing!"}); // return i have initialized because if not then code will keep executing itself
        }
        res.status(200).json({message:"listing is fetched !",list:collection})
    }catch(error){
       next(error);
    }
})

router.put("/:id",authMiddleware,async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {name,location,price,amenities,images,rating}=req.body;
        const collection= await hotel.findByIdAndUpdate(id,{name,location,price,amenities,images,rating},{new:true});

        if(collection==null){
           return res.status(404).json({message:"can not find the listing!"}); // return i have initialized because if not then code will keep executing itself
        }
        res.status(200).json({message:"Listing has been updated successfully",list:collection});
    }catch(error){
        next(error)
    }
})

router.delete("/:id",authMiddleware,async(req,res,next)=>{
    try{
        const {id}=req.params;
        const deleted= await hotel.findByIdAndDelete(id);

        if(deleted===null){
            return res.status(404).json({message:"Listing does not exist",list:deleted})
        }
        res.status(200).json({message:"The Listing has been deleted successfully",list:deleted});
    }catch(error){
        next(error);
    }
})
module.exports=router;