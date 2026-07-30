const express=require("express");
const router=express.Router();
const flight=require("../models/flight");
const authMiddleware=require("../middleware/auth");

router.post("/",authMiddleware,async(req,res)=>{
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
        console.log(error);
        res.status(400).json({message:"There is a error in the request"});
    }
});

router.get("/",async(req,res)=>{
    try{
        const flightStatus= await flight.find({});
        res.status(200).json({message:"all the listings is available!",flights:flightStatus});
    }catch(error){
        console.log(error);
        res.status(400).json({message:"there is some error Listing is not available!"});
    } 
});

router.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const flightStatus=await flight.findById(id);

        if(!flightStatus){
            return res.status(400).json({message:"flight is not there",fights:flightStatus})
        }
        res.status(200).json({message:"your flight info is here !",flight:flightStatus});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"There is an error exist !"})
    }
})

router.put("/:id",authMiddleware,async(req,res)=>{
    try{
        const {id}=req.params;
        const {flightNumber,airline,from,to,departureTime,arrivalTime,price,seats,type,returnDate}=req.body;
        const flightStatus_update=await flight.findByIdAndUpdate(id,{flightNumber,airline,from,to,departureTime,arrivalTime,price,seats,type,returnDate},{new:true});

        if(flightStatus_update===null){
            return res.status(401).json({message:"Nothing is there on the listing"});
        }
        res.status(200).json({message:"Your Listing has been successfully updated",flight:flightStatus_update});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error occured"})
    }
});

router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        const {id}=req.params;
        const flightStatus_delete= await flight.findByIdAndDelete(id);

        if(flightStatus_delete===null){
            return res.status(400).json({message:"there is an error deleting the listing"});
        }
        res.status(200).json({message:"Your Listing has been successfully deleted",flight:flightStatus_delete});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"there is an error deleting the listing"});
    }
})


module.exports=router;