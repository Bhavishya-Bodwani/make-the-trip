const express=require("express")
const app=express();
const port=8090;

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.listen(port,()=>{
    console.log(`app is litening on port: ${port}`)
})