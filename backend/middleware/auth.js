const jwt= require("jsonwebtoken")


function authmiddleware(req,res,next){
    const authHeader= req.headers.authorization;
    try{
        if(!authHeader){
        res.status(401).json({msg:"The auth header is empty"})
        }else{
        const token=authHeader.split(" ")[1];
        const verify=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=verify.id
        next()
        }
    }catch(err){
        console.log(err);
        res.status(401).json({msg:"Invalid Token"})
    }
}

module.exports = authmiddleware;
