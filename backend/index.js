const express=require("express")
const app=express();
const port=8090;
const auth= require("./routes/auth") 
const mongoose = require('mongoose');
main()
.then(()=>{
    console.log("Connection is Successfull")
})
.catch((err)=>{
    console.log(err)
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/makeit');
}

app.use(express.json()) //middleware should be at the top 

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.use("/auth",auth)

app.listen(port,()=>{
    console.log(`app is litening on port: ${port}`)
})