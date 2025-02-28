import jwt from "jsonwebtoken"
import redisClient from "../services/redis.service.js"

export const authuser =async(req,res,next)=>{
    try{
const token =req.cookies.stevin_token
    if(!token){
      return  res.status(401).send("Unauthorized user")
    }
    //const isBlacklisted =await redisClient.get(token)
   /* if(isBlacklisted){
        res.cookie('stevin-token', ' ')
        return  res.status(401).send("Unauthorized user")
      }*/
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded;
    next()
    }catch(error){
        res.status(401).send(error)
    }
    


}