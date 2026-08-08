const express=require("express");
const router=express.Router();
const flight=require("../models/flight");
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,async(req,res,next)=>{
    try{
        const {flightNumber,airline,from,to,departureTime,arrivalTime,price,seats,type,returnDate}=req.body;

        const flightInfo= new flight({
            flightNumber:flightNumber,
            airline:airline,
            from:from,
            to:to,
            departureTime:departureTime,
            arrivalTime:arrivalTime,
            price:price,
            seats:seats,
            type:type,
            returnDate:returnDate,
        });

        await flightInfo.save();
        res.status(200).json({message:"your search related flights are here !",flight:flightInfo});
    }catch(error){
        next(error);
    }
});

router.get("/",async(req,res,next)=>{
    try{
        const {from,to,airline}=req.query;
        const filter={};
        if(from){
            filter.from=from;
        }
        if(to){
            filter.to=to;
        }
        if(airline){
            filter.airline=airline;
        }
        const {minPrice,maxPrice}=req.query;
        const filterPrice={};
        if(minPrice){
            filterPrice.$gte=Number(minPrice);
        }
        if(maxPrice){
            filterPrice.$lte=Number(maxPrice);
        }
        const priceFilter=Object.keys(filterPrice).length?{price:filterPrice}:{};
        const combined={...filter,...priceFilter};
        const flightStatus= await flight.find(combined);
        res.status(200).json({message:"all the listings is available!",flights:flightStatus});
    }catch(error){
        next(error);
    } 
});

router.get("/:id",async(req,res,next)=>{
    try{
        const {id}=req.params;
        const flightStatus=await flight.findById(id);

        if(!flightStatus){
            return res.status(400).json({message:"flight is not there",fights:flightStatus})
        }
        res.status(200).json({message:"your flight info is here !",flight:flightStatus});
    }catch(error){
        next(error)
    }
})

router.put("/:id",authMiddleware,async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {flightNumber,airline,from,to,departureTime,arrivalTime,price,seats,type,returnDate}=req.body;
        const flightStatus_update=await flight.findByIdAndUpdate(id,{flightNumber,airline,from,to,departureTime,arrivalTime,price,seats,type,returnDate},{new:true});

        if(flightStatus_update===null){
            return res.status(401).json({message:"Nothing is there on the listing"});
        }
        res.status(200).json({message:"Your Listing has been successfully updated",flight:flightStatus_update});
    }catch(error){
       next(error);
    }
});

router.delete("/:id",authMiddleware,async(req,res,next)=>{
    try{
        const {id}=req.params;
        const flightStatus_delete= await flight.findByIdAndDelete(id);

        if(flightStatus_delete===null){
            return res.status(400).json({message:"there is an error deleting the listing"});
        }
        res.status(200).json({message:"Your Listing has been successfully deleted",flight:flightStatus_delete});
    }catch(error){
       next(error)
    }
})


module.exports=router;